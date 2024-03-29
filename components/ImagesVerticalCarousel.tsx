"use client";

import { cn } from "@/lib/cn";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Modal from "./Modal";
import { TbZoomScan } from "react-icons/tb";

type ImagesVerticalCarouselProps = {
  imagesArr: string[] | undefined;
};
const defaultImage = "/product-default-list-350.jpg";
export default function ImagesVerticalCarousel({
  imagesArr,
}: ImagesVerticalCarouselProps) {
  const [activeImage, setActiveImage] = useState(
    () => imagesArr?.[0] ?? defaultImage
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="flex flex-grow gap-3 items-center">
      <div className=" flex flex-col w-fit ">
        <button
          aria-label="Previous"
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
          className="h-96 "
          ref={flicking}
          horizontal={false}
          align="prev"
          onWillChange={(e) => {
            setActiveImage(imagesArr?.[e.index] ?? defaultImage);
          }}>
          {(Array.isArray(imagesArr) && imagesArr?.length > 0
            ? imagesArr
            : [defaultImage]
          )?.map((img, i) => {
            return (
              <button
                aria-label={`Select ${i} image`}
                type="button"
                key={img}
                onClick={() => handleClickImage(img)}
                className="h-14 w-14 sm:h-20 sm:w-20 relative rounded-lg m-1 ">
                <Image
                  draggable={false}
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
              </button>
            );
          })}
        </Flicking>
        <button
          aria-label="Next Image"
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

      <button
        aria-label="Zoom image"
        type="button"
        onClick={() => setIsModalOpen((isOpen) => !isOpen)}
        className="relative h-72 w-60 sm:h-96 sm:w-96 lg:mx-3 group mx-auto">
        <Image
          className="object-contain rounded-lg border border-gray-20 sm:p-2 "
          fill
          src={activeImage || defaultImage}
          alt="Product image"
        />
        <TbZoomScan className="absolute h-10 w-10 text-gray-700 opacity-0 group-hover:opacity-80 right-3 top-3 transition-all " />
      </button>

      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <Image
          className="object-contain p-2"
          // fill
          width={500}
          height={500}
          src={activeImage || defaultImage}
          alt="Product zoomed image"
          quality={85}
        />
      </Modal>
    </section>
  );
}
