"use client";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import SpinnerCircle from "@/components/SpinnerCircle";
import { useCart } from "@/context/CartContext";
import { getFavouriteProducts } from "@/services/frontend/getFavouriteProducts";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function FavouritesPage() {
  const { favouriteProducts } = useCart();

  const {
    data: favourites,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["favourites", favouriteProducts],
    queryFn: () => getFavouriteProducts(favouriteProducts),
  });

  if (error?.message) toast.error(error.message);

  return (
    <div className="center">
      <h2 className="text-3xl font-semibold text-gray-800 flex gap-4 items-center pt-6">
        <span>Your favourite products:</span>
        {isLoading ? <SpinnerCircle loadingMessage="" /> : null}
      </h2>

      {Array.isArray(favourites) && favourites.length === 0 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <span className="text-2xl">
            Your favorites list is empty. Start adding your favorite products
            now!
          </span>
        </div>
      ) : null}

      {error?.message ? (
        <div className="flex justify-center items-center h-[80vh]">
          <span className="text-2xl">
            {"🥹 Error getting favourite products..."}
          </span>
        </div>
      ) : null}

      <div className="grid grid-cols-4 gap-4 pt-4">
        {isLoading
          ? new Array(favouriteProducts.length)
              .fill(0)
              .map((_el, i) => <ProductCardSkeleton key={i} />)
          : favourites?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default FavouritesPage;
