import LatestProducts from "@/components/LatestProducts";
import PromotedProduct from "@/components/PromotedProduct";

export default function Home() {
  return (
    <div className="">
      <PromotedProduct />
      <LatestProducts />
    </div>
  );
}
