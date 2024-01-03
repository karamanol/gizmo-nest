import LatestProducts from "@/components/LatestProducts";
import PromotedProduct from "@/components/PromotedProducts";
import SpinnerCircle from "@/components/SpinnerCircle";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <PromotedProduct />
      <LatestProducts />
    </div>
  );
}
