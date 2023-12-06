"use client";

import { FullInfoProductType } from "@/app/cart/page";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

type CartItemProps = {
  product: FullInfoProductType;
  setFullInfoProductsInCart: Dispatch<SetStateAction<FullInfoProductType[]>>;
  setProductsInCart: Dispatch<SetStateAction<string[]>>;
};

function CartItem({
  product,
  setFullInfoProductsInCart,
  setProductsInCart,
}: CartItemProps) {
  // +- buttons handler
  const handleChangeQuantityByOne = useCallback(
    (idToIncrease: string, operation: "+" | "-") => {
      setFullInfoProductsInCart((prev) => {
        return prev.map((product) => {
          if (product?._id !== idToIncrease) {
            return product;
          } else {
            const finalQuantity = Math.max(
              operation === "+" ? product.quantity + 1 : product.quantity - 1,
              0
            );
            return { ...product, quantity: finalQuantity };
          }
        });
      });
    },
    [setFullInfoProductsInCart]
  );

  if (product === null || product === undefined) return null;

  return (
    <li
      className="grid grid-cols-[1fr,1.5fr,1fr,1fr] min-h-[4rem] my-1 pt-1"
      key={product?._id}>
      <section className="flex h-[60px] w-[80px] justify-center items-center m-1 border rounded-md overflow-hidden">
        <Image
          src={product?.images?.at(-1) || "/product-default-list-350.jpg"}
          height={40}
          width={40}
          className=""
          alt={`${product?.name} image`}
        />
      </section>

      <div className="flex justify-between items-center group">
        <h3 className="">{product?.name}</h3>
        <button
          className="opacity-0 group-hover:opacity-100 hover:text-red-700 transition-all duration-200 ml-1"
          onClick={() => {
            setFullInfoProductsInCart((prev) =>
              prev.map((prod) =>
                prod._id !== product._id ? prod : { ...prod, quantity: 0 }
              )
            );
          }}>
          <MdDeleteForever className="w-6 h-6" />
        </button>
      </div>

      {product?.quantity && product.quantity > 0 ? (
        <div className="flex justify-center items-center gap-1">
          <button
            className=" flex items-center justify-center"
            onClick={() => handleChangeQuantityByOne(product._id, "-")}>
            <FaMinusCircle className="text-gray-700 hover:text-[#306c8a] transition-colors h-[14px]" />
          </button>
          <span>{product.quantity}</span>
          <button
            type="button"
            className="flex items-center justify-center "
            onClick={() => handleChangeQuantityByOne(product._id, "+")}>
            <FaPlusCircle className="text-gray-700 hover:text-[#306c8a] transition-colors h-[14px]" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center flex-col">
          <span className="text-center text-sm text-red-700">Remove?</span>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setProductsInCart((prev) =>
                  prev.filter((id) => id !== product._id)
                );
              }}>
              <HiCheckCircle className="h-[18px] w-[18px] text-gray-700 hover:text-[#306c8a]" />
            </button>
            <button>
              <MdCancel
                className="h-[18px] w-[18px] text-gray-700 hover:text-[#306c8a]"
                onClick={() => {
                  handleChangeQuantityByOne(product._id, "+");
                }}
              />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end gap-2">
        <span className="inline-block text-gray-500 relative">
          {product.discount ? product.price : ""}
          <div className="h-[2px] bg-red-800/90 rounded-md absolute z-50 inset-0 -rotate-12 translate-y-[520%]"></div>
        </span>
        <span className="inline-block font-semibold">
          {(product?.price || 0) - (product?.discount || 0)}
        </span>
      </div>
    </li>
  );
}

export default CartItem;
