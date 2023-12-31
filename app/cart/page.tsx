"use client";

import CartForm from "@/components/CartForm";
import CartItem from "@/components/CartItem";
import PaymentCanceled from "@/components/PaymentCanceled";
import PaymentSuccess from "@/components/PaymentSuccess";
import SpinnerCircle from "@/components/SpinnerCircle";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type FullInfoProductType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  discount: number;
  category?: string;
  productProperties?: { [key: string]: string };
  updatedAt: Date;
  createdAt?: Date;
  quantity: number;
};

function CartPage() {
  const { productsInCart, setProductsInCart, clearCart } = useCart();

  const [fullInfoProductsInCart, setFullInfoProductsInCart] = useState<
    Array<FullInfoProductType>
  >([]);
  const [isFetching, setIsFetching] = useState(false);

  // smooth list animation hook
  const { 0: parent } = useAutoAnimate();

  const searchParams = useSearchParams();

  // get full products info from db based on user cart data
  useEffect(() => {
    (async () => {
      try {
        if (productsInCart?.length > 0) {
          setIsFetching(true);
          const res = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify(productsInCart),
          });
          const data: { data: FullInfoProductType[]; error?: string } =
            await res.json();

          if (!("error" in data) && data?.data?.length > 0) {
            setFullInfoProductsInCart((prev) => {
              // creating this object to not loose quantity state when deleting product from cart
              const prevProductQuantities: Record<
                FullInfoProductType["_id"],
                FullInfoProductType["quantity"]
              > = prev?.reduce((acc, prod) => {
                return { ...acc, [prod._id]: prod.quantity };
              }, {});

              return data.data.map((el) => {
                return { ...el, quantity: prevProductQuantities[el._id] || 1 };
              });
            });
          } else {
            throw new Error("Error fetching products");
          }
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setIsFetching(false);
      }
    })();
  }, [productsInCart, setFullInfoProductsInCart, setIsFetching]);

  const totalCartCost = fullInfoProductsInCart?.reduce((acc, prod) => {
    return acc + (prod.price - prod.discount) * prod.quantity;
  }, 0);

  useEffect(() => {
    if (searchParams.get("success") === "true") clearCart();
    // eslint-disable-next-line
  }, [searchParams]);
  if (searchParams.get("success") === "true") {
    return <PaymentSuccess />;
  } else if (searchParams.get("success") === "false") {
    return <PaymentCanceled />;
  }

  // console.log("full info products", fullInfoProductsInCart);

  return (
    <main
      className={cn(
        productsInCart.length ? "grid grid-cols-[1.5fr,1fr]" : "flex",
        "center pt-6 gap-5 min-h-[20rem] "
      )}>
      <article className="bg-white rounded-md p-6 flex flex-col min-w-full">
        {!productsInCart.length ? (
          <div className="flex  flex-col items-center mt-6 text-lg">
            Your cart is empty
          </div>
        ) : (
          <div>
            <h2 className="inline-block text-3xl font-bold text-gray-900 w-full text-center">
              Added products:
            </h2>
            <section className="w-full flex flex-col divide-y-2 divide-dotted mt-2">
              <section className="grid grid-cols-[1fr,1.5fr,1fr,1fr] min-h-[3rem]">
                <span></span>
                <span className="flex justify-start items-end font-bold">
                  Product name
                </span>
                <span className="flex justify-center items-end font-bold">
                  Quantity
                </span>
                <span className="flex justify-end items-end font-bold">
                  Price
                </span>
              </section>

              <ul ref={parent} className="divide-y-2 divide-dotted">
                {fullInfoProductsInCart.map((prod) => {
                  return (
                    <CartItem
                      key={prod._id}
                      product={prod}
                      setFullInfoProductsInCart={setFullInfoProductsInCart}
                      setProductsInCart={setProductsInCart}
                    />
                  );
                })}
              </ul>
              {fullInfoProductsInCart.length > 0 ? (
                <section className="flex justify-end gap-3 !border-solid text-gray-900 border-gray-700 mt-3 pt-3 font-bold text-xl">
                  <span className="">Total:</span>
                  <span>
                    {totalCartCost.toLocaleString("en-US", {
                      currency: "USD",
                      style: "currency",
                    })}
                  </span>
                </section>
              ) : null}
            </section>
          </div>
        )}
        {isFetching && fullInfoProductsInCart.length === 0 ? (
          <SpinnerCircle loadingMessage="Loading..." className="mt-5" />
        ) : null}
      </article>

      {!!productsInCart.length && (
        <article className="bg-white flex flex-col rounded-md p-3">
          <span className="text-2xl font-bold text-gray-900 text-center my-5">
            Your order information:
          </span>
          <CartForm fullInfoProductsInCart={fullInfoProductsInCart} />
        </article>
      )}
    </main>
  );
}

export default CartPage;
