import Link from "next/link";
import { CiMoneyCheck1 } from "react-icons/ci";

function PaymentCanceled() {
  return (
    <div className="pt-6 mx-6">
      <article className="center flex flex-col items-center bg-white rounded-md ">
        <h1 className="text-center text-4xl  font-semibold text-gray-900 mb-6 mt-20">
          Payment cancelled!
        </h1>
        <CiMoneyCheck1 className="text-gray-800 h-32 w-32" />
        <Link
          replace
          href={"/"}
          className="mt-12 mb-20 bg-[#306c8a] px-3 py-1 rounded-md text-gray-100 hover:bg-[#306c8a]/90 transition-colors">
          Continue browsing
        </Link>
      </article>
    </div>
  );
}

export default PaymentCanceled;
