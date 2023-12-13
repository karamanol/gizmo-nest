import { getLatestUpdatedProducts } from "@/services/getLatestProducts";
import ProductCard from "./ProductCard";
import SpinnerCircle from "./SpinnerCircle";
import { useEffect } from "react";

async function LatestProducts() {
  const latestProducts = await getLatestUpdatedProducts(8);
  // console.log(latestProducts);

  return (
    <section className="center">
      <h2 className="text-3xl font-semibold text-gray-800 mt-6">
        Latest Products:
      </h2>
      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 pt-4">
          {latestProducts.map((product) => {
            return <ProductCard product={product} key={product?._id} />;
          })}
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center">
          <SpinnerCircle />
        </div>
      )}
    </section>
  );
}

export default LatestProducts;
