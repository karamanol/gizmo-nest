"use client";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { IoHeartDislike } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { useCart } from "@/context/CartContext";

type AddToFavouriteButtonProps = {
  productId: string;
};

function AddToFavouriteButton({ productId }: AddToFavouriteButtonProps) {
  const {
    favouriteProducts,
    addToFavouriteById,
    removeFromFavouriteById,
    isProductInFavourites,
  } = useCart();

  const [isAddedToFavourite, setIsAddedToFavourite] = useState(() =>
    isProductInFavourites(productId)
  );

  useEffect(() => {
    setIsAddedToFavourite(isProductInFavourites(productId));
  }, [favouriteProducts, isProductInFavourites, productId]);

  const handleClick = () => {
    isAddedToFavourite
      ? removeFromFavouriteById(productId)
      : addToFavouriteById(productId);
    toast.success(
      `${isAddedToFavourite ? "Removed from" : "Added to"} favourites`,
      {
        icon: isAddedToFavourite ? (
          <IoHeartDislike />
        ) : (
          <IoIosHeart className="text-red-500" />
        ),
      }
    );
  };

  return (
    <div
      className={cn(
        "h-10 w-10  border rounded-md overflow-hidden transition-all shadow-sm",
        isAddedToFavourite ? "border-red-400 bg-red-100/40" : "bg-gray-100/70"
      )}>
      <button
        onClick={handleClick}
        className={cn(
          "h-20 w-10 transition-transform duration-300 hover:opacity-75",
          !isAddedToFavourite ? "-translate-y-[50%] " : ""
        )}>
        <div className="h-10 flex justify-center items-center">
          <FiHeart className="text-red-500 scale-150" />
        </div>
        <div className="h-10 flex justify-center items-center">
          <FiHeart className="text-gray-700 scale-150" />
        </div>
      </button>
    </div>
  );
}

export default AddToFavouriteButton;
