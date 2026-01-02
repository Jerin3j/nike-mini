import { Suspense } from "react";
import OrderSuccessClient from "./OrderSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
