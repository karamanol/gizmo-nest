"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";

type ProductCardAddButtonProps = {
  productId: string;
  disabled?: boolean;
};

function ProductCardAddButton({
  productId,
  disabled,
}: ProductCardAddButtonProps) {
  const { addToCartById, removeFromCartById, productsInCart } = useCart();
  const alreadyInCart = productsInCart.includes(productId);

  return (
    <button
      disabled={disabled}
      className={cn(
        alreadyInCart
          ? "bg-teal-500 hover:bg-teal-600"
          : "bg-blue-400/70 hover:bg-blue-400",
        disabled ? "bg-gray-300 hover:bg-gray-300" : "",
        "border p-2 rounded  mt-auto  transition-all"
      )}
      onClick={() => {
        if (!productId) return;
        if (alreadyInCart) {
          removeFromCartById(productId);
          toast.success("Removed from cart", {
            iconTheme: { primary: "#60a5fa", secondary: "" },
          });
        } else {
          addToCartById(productId);
          toast.success("Added to cart", {
            iconTheme: { primary: "#0d9488", secondary: "" },
          });
        }
      }}>
      {alreadyInCart ? (
        <MdOutlineRemoveShoppingCart className="w-7 h-7" />
      ) : (
        <RiShoppingCartLine className="w-7 h-7 text-gray-800" />
      )}
    </button>
  );
}

export default ProductCardAddButton;
