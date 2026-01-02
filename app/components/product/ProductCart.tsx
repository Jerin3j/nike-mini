"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

type Size = {
  size_id: number;
  size_name: string;
  price: number;
  variation_product_id: number;
};

type VariationColor = {
  color_id: number;
  color_name: string;
  color_images: string[];
  sizes: Size[];
};

type Product = {
  id: string;
  name: string;
  product_images: { product_image: string }[];
  variation_colors: VariationColor[];
};

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [activeColor, setActiveColor] = useState<VariationColor | null>(null);
  const [activeSize, setActiveSize] = useState<Size | null>(null);

  useEffect(() => {
    if (product.variation_colors?.length) {
      setActiveColor(product.variation_colors[0]);
    }
  }, [product]);

  useEffect(() => {
    if (activeColor?.sizes?.length) {
      setActiveSize(activeColor.sizes[0]);
    }
  }, [activeColor]);

  const imageRef = useRef<HTMLImageElement>(null);
  const productRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    if (!tl.current) {
      tl.current = gsap.timeline({ paused: true });

      tl.current
        .to(imageRef.current, {
          y: -40,
          duration: 0.4,
          ease: "power3.out",
        })
        .to(
          productRef.current,
          {
            y: -60,
            yPercent: -60,
            duration: 0.4,
            ease: "power3.out",
          },
          "<"
        )
        .fromTo(
          detailsRef.current,
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          },
          "<"
        );
    }

    tl.current.play();
  };

  const handleLeave = () => {
    tl.current?.reverse();
  };

  if (!activeColor) return null;

  // product buy

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("Please login first");
        return;
      }

      if (!activeSize) {
        alert("Please select a size");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/purchase-product/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            variation_product_id: activeSize.variation_product_id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Purchase failed");
      }

      const orderedAt = new Date().toISOString();

      router.push(
        `/order-success?` +
          `orderId=${data.order.id}` +
          `&name=${encodeURIComponent(product.name)}` +
          `&image=${encodeURIComponent(activeColor.color_images[0])}` +
          `&size=${activeSize.size_name}` +
          `&amount=${data.order.total_amount}` +
          `&orderedAt=${orderedAt}`
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative w-full lg:w-[260px] h-[400px] bg-[#232323] rounded-lg overflow-hidden text-white"
    >
      {/* IMAGE (ALWAYS VISIBLE) */}
      <div className="relative z-10 h-[260px] overflow-hidden">
        <img
          ref={imageRef}
          src={activeColor.color_images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <h1
        ref={productRef}
        className="text-2xl mt-10 font-bold text-center z-10"
      >
        {product.name}
      </h1>

      <div
        ref={detailsRef}
        className="absolute bottom-0 left-0 w-full px-5 pb-5 z-20 opacity-0"
      >
        {/* SIZE */}
        <div className="flex items-center gap-4 mb-3">
          <p className="text-xs text-gray-400">SIZE:</p>
          <div className="flex gap-2">
            {activeColor.sizes.map((size) => (
              <button
                key={size.size_id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSize(size);
                }}
                className={`w-6 h-6 rounded text-xs font-semibold
           ${
             activeSize?.size_id === size.size_id
               ? "bg-black text-white"
               : "bg-white text-black"
           }`}
              >
                {size.size_name}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR */}
        <div className="flex items-center gap-4 mb-4">
          <p className="text-xs text-gray-400">COLOR:</p>
          <div className="flex gap-3">
            {product.variation_colors.map((color) => (
              <button
                key={color.color_id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(color);
                }}
                className={`w-4 h-4 rounded-full ring-2 ${
                  activeColor.color_id === color.color_id
                    ? "ring-white"
                    : "ring-transparent"
                }`}
                style={{
                  backgroundColor:
                    color.color_name === "Black"
                      ? "#111"
                      : color.color_name === "White"
                      ? "#e5e5e5"
                      : "#ef4444",
                }}
              />
            ))}
          </div>
        </div>

        {/* BUY BUTTON */}
        <button
          onClick={handleBuyNow}
          className="w-full bg-white text-black py-2 rounded-lg font-semibold cursor-pointer"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
