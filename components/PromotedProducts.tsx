"use client";

import { ProductType } from "@/services/server/getOneProductById";
import Image from "next/image";
import Link from "next/link";
import WidedAddProductButton from "./WideAddProductButton";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { useEffect, useState } from "react";
import { getPromotedProducs } from "@/services/frontend/getPromotedProducts";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import SpinnerCircle from "./SpinnerCircle";
import "../css/flicking.css";
import "../css/flickingArrow.css";

const promotedProductsAmount = 3;

function PromotedProduct() {
  const [promotedProducts, setPromotedProducts] = useState<Array<ProductType>>(
    []
  );
  const plugins = [
    new AutoPlay({ duration: 4000, direction: "NEXT", stopOnHover: true }),
    new Arrow({}),
  ];

  useEffect(() => {
    (async () => {
      const products = await getPromotedProducs(promotedProductsAmount);
      if (Array.isArray(products) && products.length > 0) {
        setPromotedProducts(products);
      }
    })();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-700 sm:pb-8">
      <div className=" relative max-w-5xl mx-auto px-3 sm:px-10 ">
        {!promotedProducts?.length ? (
          <SpinnerCircle className="absolute inset-0 scale-[200%]" />
        ) : null}
        <Flicking
          plugins={plugins}
          inputType={["mouse", "touch"]}
          duration={600}
          // bound
          interruptable
          deceleration={0.01}
          className="min-h-[40rem] lg:h-[26rem]"
          // ref={flicking}
          align="center"
          // onWillChange={(e) => {
          //   setActiveImage(imagesArr?.[e.index] ?? defaultImage);
          // }}
          panelsPerView={1}
          circular={true}>
          {Array.isArray(promotedProducts) && promotedProducts.length > 0
            ? promotedProducts.map((product) => {
                return (
                  <article
                    key={product?._id}
                    className="card-panel relative grid grid-rows-[1fr,1.2fr] lg:grid-cols-[1.2fr,1fr]  center pt-8 pb-6 gap-3 !px-14 ">
                    <div className="flex flex-col !my-auto lg:m-0 row-start-2 lg:row-start-auto h-fit ">
                      <h1 className="text-gray-200 text-3xl mb-2 text-center lg:text-left">
                        {product?.name}
                      </h1>
                      <p className="text-gray-300/80 mb-4">
                        {product?.description}
                      </p>
                      <div className="flex lg:justify-start justify-between sm:justify-around lg:gap-8 mt-auto">
                        <Link
                          draggable={false}
                          href={`/product/${product?._id}`}
                          className="btn-primary opacity-60 flex justify-center items-center">
                          <span className="whitespace-nowrap">Read more</span>
                        </Link>
                        <WidedAddProductButton productId={product?._id ?? ""} />
                      </div>
                    </div>
                    <Link
                      href={`/product/${product?._id}`}
                      draggable={false}
                      className="relative rounded-md h-96">
                      <Image
                        draggable={false}
                        src={
                          product?.images?.at(-1) ||
                          "/product-default-list-350.jpg"
                        }
                        fill
                        alt={product?.name || "Promoted product"}
                        className="object-contain"
                        quality={60}
                      />
                    </Link>
                  </article>
                );
              })
            : null}
          <ViewportSlot>
            <span className="flicking-arrow-prev !-translate-x-7"></span>
            <span className="flicking-arrow-next !translate-x-7"></span>
          </ViewportSlot>
        </Flicking>
      </div>
    </div>
  );
}

export default PromotedProduct;
