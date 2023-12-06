"use client";

import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import toast from "react-hot-toast";
import { RiShoppingCartLine } from "react-icons/ri";

type PromotedAddButtonProps = { promotedId: string };

function PromotedAddButton({ promotedId }: PromotedAddButtonProps) {
  const { addToCartById, removeFromCartById, productsInCart } = useCart();
  const alreadyInCart = productsInCart?.includes(promotedId);

  return (
    <button
      className="flex gap-1 justify-center items-center btn-primary "
      onClick={() => {
        if (!promotedId) return;
        if (alreadyInCart) {
          removeFromCartById(promotedId);
          toast.success("Removed from cart", {
            iconTheme: { primary: "#60a5fa", secondary: "" },
          });
        } else {
          addToCartById(promotedId);
          toast.success("Added to cart", {
            iconTheme: { primary: "#0d9488", secondary: "" },
          });
        }
      }}>
      <span>{alreadyInCart ? "Added to" : "Add to"}</span>
      <RiShoppingCartLine
        className={cn(
          alreadyInCart ? "text-green-600" : "",
          "transition-colors"
        )}
      />
    </button>
  );
}

export default PromotedAddButton;
