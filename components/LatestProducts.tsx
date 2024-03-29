import { getLatestUpdatedProducts } from "@/services/server/getLatestProducts";
import ProductCard from "./ProductCard";
import SpinnerCircle from "./SpinnerCircle";

const productsAmount = 8;
const threeHoursInSeconds = 3600 * 3;
export const revalidate = threeHoursInSeconds;
async function LatestProducts() {
  const latestProducts = await getLatestUpdatedProducts(productsAmount);

  return (
    <section className="center">
      <h2 className="text-3xl font-semibold text-gray-800 mt-6">
        Latest Products:
      </h2>
      {typeof latestProducts !== "undefined" && latestProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          {latestProducts.map((product) => {
            return <ProductCard product={product} key={product?._id} />;
          })}
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center">
          <SpinnerCircle loadingMessage="Loading..." />
        </div>
      )}
    </section>
  );
}

export default LatestProducts;
