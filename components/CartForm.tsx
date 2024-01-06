"use client";

import { FullInfoProductType } from "@/app/cart/page";
import { cn } from "@/lib/cn";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  city: string;
  postcode: string;
  address: string;
  country: string;
  number: string;
};

type CartFormProps = {
  fullInfoProductsInCart: FullInfoProductType[];
};

function CartForm({ fullInfoProductsInCart }: CartFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (inputsData) => {
    try {
      const url = "/api/order-checkout";
      const productsData = fullInfoProductsInCart?.map((prod) => {
        return {
          _id: prod._id,
          category: prod.category,
          quantity: prod.quantity,
          name: prod.name,
        };
      });
      const dataAsJSON = JSON.stringify({ inputsData, productsData });
      const resp = await fetch(url, {
        method: "POST",
        body: dataAsJSON,
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();

      if (resp?.ok && !("error" in data) && "urlTorRedirect" in data) {
        reset();
        router.push(data.urlTorRedirect); // go to payment page
      } else if (data.error) {
        toast.error("Error creating order");
      }
    } catch (err) {
      toast.error("Failed to create order");
    }
  };

  const { 0: parent } = useAutoAnimate(); // smooth animation hook

  return (
    <form
      ref={parent}
      onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col  m-3 h-full"}>
      {errors.name?.message && <FormInputError message={errors.name.message} />}
      <input
        className={cn("cart-input", {
          "!border-b-2 border-red-700 ": errors.name?.message,
        })}
        type="text"
        placeholder="Your full name"
        {...register("name", { required: "Provide your name" })}
      />

      {errors.email?.message && (
        <FormInputError message={errors.email.message} />
      )}
      <input
        className={cn("cart-input", {
          "!border-b-2 border-red-700 ": errors.email?.message,
        })}
        type="email"
        placeholder="Email to get receipt"
        {...register("email", {
          required: "Provide your email",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Please provide valid email address",
          },
        })}
      />

      <div className="grid grid-cols-[2fr,1fr]  md:grid-cols-[1.6fr,1fr]">
        {errors.city?.message && (
          <FormInputError message={errors.city.message} />
        )}
        {errors.postcode?.message && (
          <FormInputError message={errors.postcode.message} />
        )}
      </div>
      <div className="flex gap-2">
        <input
          className={cn("cart-input w-auto", {
            "!border-b-2 border-red-700 ": errors.city?.message,
          })}
          placeholder="City"
          {...register("city", { required: "Provide your city" })}
        />

        <input
          className={cn("cart-input max-w-[8rem]", {
            "!border-b-2 border-red-700 ": errors.postcode?.message,
          })}
          placeholder="Postal code"
          type="number"
          {...register("postcode", { required: "Enter code" })}
        />
      </div>

      {errors.address?.message && (
        <FormInputError message={errors.address.message} />
      )}
      <input
        className={cn("cart-input", {
          "!border-b-2 border-red-700 ": errors.address?.message,
        })}
        type="text"
        placeholder="Street address"
        {...register("address", { required: "Add your full address" })}
      />

      {errors.country?.message && (
        <FormInputError message={errors.country.message} />
      )}
      <input
        className={cn("cart-input", {
          "!border-b-2 border-red-700 ": errors.country?.message,
        })}
        type="text"
        placeholder="Country"
        {...register("country", { required: "Enter your country" })}
      />

      {errors.number?.message && (
        <FormInputError message={errors.number.message} />
      )}
      <input
        className={cn("cart-input", {
          "!border-b-2 border-red-700 ": errors.number?.message,
        })}
        type="tel"
        placeholder="Your number"
        {...register("number", { required: "Number is required" })}
      />
      <button className="bg-sky-600 hover:bg-sky-600/80 transition-colors px-3 py-1 rounded font-semibold text-gray-800 mt-auto  h-10">
        Continue to payment
      </button>
    </form>
  );
}

export default CartForm;

function FormInputError({ message }: { message: string }) {
  return <p className={"text-red-700"}>{message + ":"}</p>;
}
