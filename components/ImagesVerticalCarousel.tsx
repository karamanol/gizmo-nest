"use client";

import { cn } from "@/lib/cn";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type ImagesVerticalCarouselProps = {
  imagesArr: string[] | undefined;
};
const defaultImage = "/product-default-list-350.jpg";
export default function ImagesVerticalCarousel({
  imagesArr,
}: ImagesVerticalCarouselProps) {
  const { 0: activeImage, 1: setActiveImage } = useState(
    () => imagesArr?.[0] ?? defaultImage
  );

  console.log("qaq", activeImage);

  const flicking = useRef<Flicking | null>(null);

  const handleClickImage = async (img: string) => {
    if (Array.isArray(imagesArr) && typeof imagesArr.length !== "undefined") {
      try {
        await flicking.current?.moveTo(
          imagesArr?.findIndex((image) => image === img)
        );
      } catch (err) {
        return; // ignore all these irrelevant errors being logged
      }
    }
  };

  const handleNext = async () => {
    if (
      flicking.current &&
      typeof flicking?.current?.index !== "undefined" &&
      Array.isArray(imagesArr) &&
      flicking?.current?.index < imagesArr.length - 1
    ) {
      try {
        // setActiveImage(imagesArr[flicking?.current?.index + 1]);
        await flicking?.current?.next();
      } catch (err) {
        return;
      }
    }
  };

  const handlePrev = async () => {
    if (
      flicking.current &&
      typeof flicking?.current?.index !== "undefined" &&
      Array.isArray(imagesArr) &&
      flicking?.current?.index > 0
    ) {
      try {
        // setActiveImage(imagesArr[flicking?.current?.index - 1]);
        await flicking?.current?.prev();
      } catch (err) {
        return;
      }
    }
  };

  return (
    <section className="flex gap-3 items-center">
      <div className=" flex flex-col w-fit">
        <button
          onClick={handlePrev}
          className="flex justify-center items-center">
          {
            <IoIosArrowUp
              className={cn(
                "h-6 w-6",
                imagesArr?.length &&
                  imagesArr?.findIndex((el) => el === activeImage) === 0
                  ? "text-gray-400 cursor-default"
                  : ""
              )}
            />
          }
        </button>
        <Flicking
          inputType={[]}
          interruptable
          preventClickOnDrag
          duration={200}
          bound
          className="h-96"
          ref={flicking}
          horizontal={false}
          align="prev"
          onWillChange={(e) => {
            setActiveImage(imagesArr?.[e.index] ?? defaultImage);
          }}
          // panelsPerView={4}
          // circular={true}
        >
          {(Array.isArray(imagesArr) && imagesArr?.length > 0
            ? imagesArr
            : [defaultImage]
          )?.map((img, i) => {
            return (
              <div key={img} className=" h-20 w-20 relative rounded-lg m-1 ">
                <Image
                  onClick={() => handleClickImage(img)}
                  fill
                  src={img}
                  alt={`Product image ${i + 1}`}
                  className={cn(
                    "object-contain rounded-lg border border-gray-20 cursor-pointer",
                    activeImage === img
                      ? "!border-[#306c8a]/70 border-2 transition-colors p-[2px]"
                      : ""
                  )}
                  quality={5}
                />
              </div>
            );
          })}
        </Flicking>
        <button
          onClick={handleNext}
          className="flex justify-center items-center">
          {
            <IoIosArrowDown
              className={cn(
                "h-6 w-6",
                imagesArr?.length &&
                  imagesArr?.findIndex((el) => el === activeImage) ===
                    imagesArr.length - 1
                  ? "text-gray-400 cursor-default"
                  : ""
              )}
            />
          }
        </button>
      </div>
      <div className="relative h-96 w-96  mx-3">
        <Image
          className="object-contain rounded-lg border border-gray-20  p-2 "
          fill
          src={activeImage || defaultImage}
          alt="Product image"
        />
      </div>
    </section>
  );
}
