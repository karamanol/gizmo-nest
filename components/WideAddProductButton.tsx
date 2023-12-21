"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import toast from "react-hot-toast";
import { RiShoppingCartLine } from "react-icons/ri";

type WideAddButtonProps = {
  productId: string;
  className?: string;
  disabled?: boolean;
};

function WideAddProductButton({
  productId,
  className,
  disabled,
}: WideAddButtonProps) {
  const { addToCartById, removeFromCartById, productsInCart } = useCart();
  const alreadyInCart = productsInCart?.includes(productId);

  return (
    <button
      disabled={disabled}
      className={cn(
        "flex gap-1 justify-center items-center btn-primary ",
        className,
        disabled ? "!bg-gray-600" : ""
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
      <span>{alreadyInCart ? "Added to" : "Add to"}</span>
      <RiShoppingCartLine
        className={cn(alreadyInCart ? "text-green-600" : "", "ml-1")}
      />
    </button>
  );
}

export default WideAddProductButton;
