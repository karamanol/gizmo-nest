"use client";

import { cn } from "@/lib/cn";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";

type FormValues = {
  name: string;
  review: string;
};

type AddReviewProps = {
  productName: string;
  productId: string;
};

function AddReviewAsDropdown({ productName, productId }: AddReviewProps) {
  const [rating, setRating] = useState(10);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const [parent] = useAutoAnimate({});

  const handleOpen = () => setIsOpen(!isOpen);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const handleCancel = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<FormValues> = async (inputsData) => {
    try {
      const name = inputsData.name;
      const review = inputsData.review;

      const dataAsJSON = JSON.stringify({ name, review, rating, productId });

      const url = "/api/reviews";
      const resp = await fetch(url, {
        method: "POST",
        body: dataAsJSON,
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();

      if (resp?.ok && !("error" in data)) {
        reset();
        setIsOpen(false);
        setRating(10);
        toast.success("Review successfully added");
        router.refresh();
      } else if (data.error) {
        toast.error("Error adding review");
        console.log(getErrorMessage(data.error));
      }
    } catch (err) {
      console.log(getErrorMessage(err));
      toast.error("Failed to create order");
    }
  };

  return (
    <div className={cn("bg-white p-4 rounded-md")} ref={parent}>
      <div
        className="flex justify-start items-center gap-3 cursor-pointer"
        onClick={handleOpen}>
        <span className=" flex items-center gap-3 ">
          <MdOutlineRateReview className="h-6 w-6 text-slate-800" />
          <span className="text-lg font-semibold">{`Want to add a review about ${productName}?`}</span>
        </span>
        {isOpen ? (
          <IoIosArrowUp className="h-6 w-6" />
        ) : (
          <IoIosArrowDown className="h-6 w-6" />
        )}
      </div>
      {isOpen && (
        <div>
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              {errors.name?.message && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
              <div className="flex items-center gap-10">
                <div className=" flex items-center w-full">
                  <label htmlFor="name" className="whitespace-nowrap mr-2">
                    Your name:
                  </label>
                  <input
                    id="name"
                    {...register("name", {
                      maxLength: { value: 50, message: "Too long name" },
                      required: "Name field is required!",
                    })}
                    className="bg-gray-50 border border-gray-200 rounded-md w-full px-2 py-1"
                    type="text"
                    placeholder="This name will be displayed for all users"
                  />
                </div>

                <div className="flex items-center ">
                  <span className="whitespace-nowrap">Rate the product:</span>

                  <div className="flex items-center gap-[2px] p-2">
                    {[...Array(10)].map((_item, index) => {
                      const currentStarRating = index + 1;
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setRating(currentStarRating);
                          }}>
                          <FaStar
                            className={cn(
                              currentStarRating <= rating
                                ? "text-yellow-600"
                                : "text-gray-300",
                              "hover:scale-125 transition-transform"
                            )}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 w-3 font-bold">{rating}</span>
                  </div>
                </div>
              </div>

              {errors.review?.message && (
                <span className="text-red-700">{errors.review.message}</span>
              )}
              <textarea
                {...register("review", {
                  required: "Review cannot be empty",
                  maxLength: {
                    value: 1000,
                    message:
                      "Too long review. Need to be less than 1000 symbols",
                  },
                })}
                placeholder="Share your experience with this product…"
                className="min-h-[7rem] bg-gray-50 border border-gray-200 rounded-md w-full px-3 pt-10 focus:pt-1 focus:text-sm transition-all duration-300 resize-none mt-3"
              />

              <div className="flex mt-3 gap-3">
                <button
                  type="submit"
                  className="bg-gray-800 text-white rounded-md px-10 py-1 hover:bg-gray-900 transition-colors">
                  Submit
                </button>
                <button
                  type="reset"
                  className="bg-gray-200 text-gray-700 rounded-md px-10 py-1 hover:bg-gray-300 transition-colors"
                  onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddReviewAsDropdown;
