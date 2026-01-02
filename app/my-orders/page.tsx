"use client";

import { useEffect, useState } from "react";

type Order = {
  order_id: string;
  created_date: string;
  product_name: string;
  product_price: number;
  product_mrp: number;
  product_amount: number;
  quantity: number;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("User not authenticated");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/user-orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();

        const extractedOrders =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.orders)
            ? data.orders
            : Array.isArray(data?.data?.orders)
            ? data.data.orders
            : [];

        setOrders(extractedOrders);
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        Loading orders…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-red-400 flex items-center justify-center">
        {error}
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-12 py-16">
      <div className="flex items-start gap-3 mb-10">
        <h1 className="text-4xl font-semibold">My Orders</h1>
      </div>

      {/* ORDERS LIST */}
      <div className="flex flex-col gap-6 items-start">
        {orders.length === 0 && (
          <p className="text-gray-400">No orders found</p>
        )}

        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-[#1f1f1f] rounded-2xl px-6 py-4 flex items-center gap-5 w-[45rem]"
          >
            {/* IMAGE */}
            <div className="w-20 h-20 bg-[#171717] rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/shoe-green.png"
                alt={order.product_name}
                className="object-cover object-top scale-110 -rotate-20"
              />
            </div>

            <div className="flex-1">
              <p className="font-medium text-2xl">{order.product_name}</p>
              <p className="text-lg text-gray-400 mt-1">
                {order.order_id}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.created_date).toLocaleString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="text-right flex gap-3 items-center">
              <p className="font-semibold">₹{order.product_amount}</p>
              <p className="text-xs text-gray-500 line-through">
                ₹{order.product_mrp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
