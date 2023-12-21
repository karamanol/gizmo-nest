"use client";

import { ProductType } from "@/services/server/getOneProductById";
import Image from "next/image";
import Link from "next/link";
import WidedAddProductButton from "./WideAddProductButton";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { useEffect, useState } from "react";
import { getPromotedProducs } from "@/services/frontend/getPromotedProducts";
import { AutoPlay, Arrow } from "@egjs/flicking-plugins";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";

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

  console.log(promotedProducts);

  return (
    <div className="bg-main pb-8">
      <div className="max-w-5xl mx-auto px-10">
        <Flicking
          plugins={plugins}
          inputType={["mouse", "touch"]}
          duration={600}
          // bound
          interruptable
          deceleration={0.01}
          className="h-96"
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
                  <div
                    key={product?._id}
                    className="card-panel relative grid grid-cols-[1.2fr,1fr] center pt-8 pb-6 gap-3 !px-14 ">
                    <div className="flex flex-col">
                      <h1 className="text-gray-200 text-3xl mb-2">
                        {product?.name}
                      </h1>
                      <p className="text-gray-400 mb-2">
                        {product?.description}
                      </p>
                      <div className="flex justify-start gap-8 mt-auto">
                        <Link
                          draggable={false}
                          href={`/product/${product?._id}`}
                          className="btn-primary opacity-60">
                          <span>Read more</span>
                        </Link>
                        <WidedAddProductButton productId={product?._id ?? ""} />
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-md">
                      <Image
                        draggable={false}
                        src={
                          product?.images?.at(-1) ||
                          "/product-default-list-350.jpg"
                        }
                        fill
                        alt={product?.name || "Promoted product"}
                        className="object-contain"
                      />
                    </div>
                  </div>
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
