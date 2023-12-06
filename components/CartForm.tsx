import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  city: string;
  postcode: string;
  address: string;
  country: string;
  number: string;
};

function CartForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // '/api/checkout'
    //! add requirements to input fields
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 m-3 h-full">
      <input
        className="cart-input"
        type="text"
        placeholder="Your full name"
        {...register("name")}
      />
      <input
        className="cart-input"
        type="email"
        placeholder="Email to get receipt"
        {...register("email")}
      />
      <div className="flex gap-2">
        <input
          className="cart-input w-auto"
          placeholder="City"
          {...register("city")}
        />
        <input
          className="cart-input max-w-[8rem]"
          placeholder="Postal code"
          type="number"
          {...register("postcode")}
        />
      </div>
      <input
        className="cart-input"
        type="text"
        placeholder="Street address"
        {...register("address")}
      />
      <input
        className="cart-input"
        type="text"
        placeholder="Country"
        {...register("country")}
      />
      <input
        className="cart-input"
        type="tel"
        placeholder="Your number"
        {...register("number")}
      />
      <button className="bg-sky-600 hover:bg-sky-600/80 transition-colors px-3 py-1 rounded font-semibold text-gray-800 mt-auto  h-10">
        Continue to payment
      </button>
    </form>
  );
}

export default CartForm;
