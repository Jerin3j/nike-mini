"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const variants = [
  {
    title: "NIKE SHOES",
    color: "red",
    image: "/shoe-red.png",
    circle: "bg-[#9D333B]",
    dot: "bg-[#9D333B]",
  },
  {
    title: "NIKE SHOES",
    color: "green",
    image: "/shoe-green.png",
    circle: "bg-[#9ADA2A]",
    dot: "bg-[#9ADA2A]",
  },
  {
    title: "NIKE SHOES",
    color: "rose",
    image: "/shoe-rose.png",
    circle: "bg-[#840D91]",
    dot: "bg-[#840D91]",
  },
  {
    title: "DUNK 3.0",
    color: "pink",
    image: "/shoe-pink.png",
    circle: "bg-[#DB8CAE]",
    dot: "bg-[#DB8CAE]",
  },
];

export default function ProductCard() {
  const [active, setActive] = useState(variants[0]);

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const nikeRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleEnter = () => {
    if (!tl.current) {
      tl.current = gsap.timeline({ paused: true });

      tl.current
        .to(contentRef.current, {
          y: -50,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(
          circleRef.current,
          {
            x: 45,
            y: -20,
            rotate: 45,
            duration: 0.6,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          nikeRef.current,
          {
            y: -50,
            duration: 0.6,
            ease: "power3.out",
          },
          "<"
        )
        .to(
          shoeRef.current,
          {
            y: -8,
            duration: 0.4,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          titleRef.current,
          {
            y: -49,
            duration: 0.6,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          detailsRef.current,
          {
            opacity: 1,
            y: -55,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );
    }

    tl.current.play();
  };

  const handleLeave = () => {
    tl.current?.reverse();
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative w-[260px] h-[400px] bg-[#1f1f1f] overflow-hidden text-white cursor-pointer"
    >
      {/* BACKGROUND TEXT */}
      <h1
        ref={nikeRef}
        className="absolute inset-0 flex items-center justify-center text-[120px] font-black text-white/5 pointer-events-none"
      >
        NIKE
      </h1>

      {/* CONTENT */}
      <div ref={contentRef} className="relative h-full px-5 pt-6">
        {/* COLOR CIRCLE */}
        <div
          ref={circleRef}
          className={`absolute -top-24 -right-24 w-[368px] h-[305px]  rounded-full transition-colors duration-500 ${active?.circle}`}
        />

        {/* SHOE */}
        <img
          ref={shoeRef}
          src={active.image}
          alt="Nike Shoe"
          className="relative z-10 w-full -rotate-30"
        />

        {/* TITLE */}
        <h2 ref={titleRef} className="relative z-10 mt-4 text-center text-lg font-semibold">
          {active.title}
        </h2>

        {/* DETAILS */}
        <div
          ref={detailsRef}
          className="mt-4 text-center opacity-0 translate-y-6 flex flex-col gap-2"
        >
          {/* SIZE */}
          <div className="flex items-center gap-5">
            <p className="text-xs text-gray-400 mb-1">SIZE:</p>
            <div className="flex justify-center gap-2">
              {["7", "8", "9", "10"].map((size) => (
                <span
                  key={size}
                  className="w-6 h-6 flex items-center justify-center rounded bg-white text-black text-sm font-semibold"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* COLOR */}
          <div className="mt-3 flex items-center gap-5">
            <p className="text-xs text-gray-400 mb-1">COLOR:</p>
            <div className="flex justify-center gap-3">
              {variants.map((v) => (
                <button
                  key={v.color}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(v);
                  }}
                  className={`w-4 h-4 rounded-full ${v.dot} ring-2 ${
                    active.color === v.color ? "ring-white" : "ring-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button className="mt-4 bg-white text-black px-6 py-2 rounded-lg font-semibold">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
