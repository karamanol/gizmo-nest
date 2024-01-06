import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

function PaymentSuccess() {
  return (
    <div className="pt-6 mx-6">
      <article className="center flex flex-col items-center bg-white rounded-md ">
        <h1 className=" text-2xl sm:text-4xl  font-semibold text-gray-900 mb-6 mt-20">
          Payment accepted!
        </h1>
        <IoCheckmarkCircle className="text-teal-700/80 h-32 w-32" />
        <p className="mt-8 px-6 sm:px-12 md:px-36 text-center">
          Thank you for shopping with us! Your order has been successfully
          processed and will be shipped out soon. You will receive an email with
          tracking information once your order has shipped.
        </p>
        <Link
          replace
          href={"/"}
          className="my-12 bg-[#306c8a] px-3 py-1 rounded-md text-gray-100 hover:bg-[#306c8a]/90 transition-colors">
          Continue browsing
        </Link>
      </article>
    </div>
  );
}

export default PaymentSuccess;
