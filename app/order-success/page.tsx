"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function OrderSuccessPage() {
  const params = useSearchParams();

  const orderId = params.get("orderId");
  const name = params.get("name");
  const image = params.get("image");
  const size = params.get("size");
  const amount = params.get("amount");
  const orderedAt = params.get("orderedAt");

  const dateTime = orderedAt
    ? new Date(orderedAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#161616] text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center">
       
     <Image
          src="/nike-logo.svg"
          alt="Nike"
          width={120}
          height={120}
          className="mb"
        />
        <h1 className="text-3xl font-semibold mb-2">
          Successfully Ordered!
        </h1>
        <p className="text-gray-400 text-sm mb-10">{dateTime}</p>

        {/* PRODUCT CARD */}
        <div className="bg-[#1f1f1f] rounded-lg px-6 py-4 flex items-center gap-5 w-[420px]">
          <div className="w-20 h-20 bg-[#1f1f1f] rounded-lg overflow-hidden flex items-center justify-center">
            {image && (
                <div className="h-20">
              <img
                src={image}
                alt={name || ""}
                className="object-cover object-top scale-110"
              />
              </div>
            )}
          </div>

          <div className="flex-1">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400 mt-1">
              UK {size}, {orderId}
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">₹{amount}</p>
            <p className="text-xs text-gray-500 line-through">
              ₹{Number(amount) + 199}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
