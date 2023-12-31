import { cn } from "@/lib/cn";
import { BiHappyBeaming } from "react-icons/bi";
import { CgSmileNeutral } from "react-icons/cg";
import { PiSmileySad } from "react-icons/pi";

type ProductAvgRatingProps = {
  className?: string;
  ratingsQuant?: number;
  ratingsAverage?: number;
};

const iconClassName = "h-14 w-14 text-gray-800 rounded-full drop-shadow-sm";
function ProductAvgRating({
  className,
  ratingsAverage,
  ratingsQuant,
}: ProductAvgRatingProps) {
  const rating = ratingsAverage || 10;
  const ratingsQuantity = ratingsQuant || 0;

  return (
    <section
      className={cn("flex flex-col justify-center items-center", className)}>
      <h2 className="font-semibold">Product average rating:</h2>
      <span className="text-7xl text-gray-800 drop-shadow-md">{rating}</span>
      <span className="mb-12 text-gray-600 text-center">
        {ratingsQuantity > 0
          ? `Based on ${ratingsQuantity} ${
              ratingsQuantity > 1 ? "reviews" : "review"
            }`
          : "No reviews have been added yet. Be the first to review!"}
      </span>

      {typeof rating !== "undefined" && rating <= 3 ? (
        <>
          <PiSmileySad className={cn(iconClassName, "bg-red-100")} />{" "}
          <span className="mt-2">{"Unhappy"}</span>
        </>
      ) : null}

      {typeof rating !== "undefined" && rating > 3 && rating <= 6 ? (
        <>
          <CgSmileNeutral className={cn(iconClassName, "bg-yellow-100")} />{" "}
          <span className="mt-2">{"Acceptable"}</span>
        </>
      ) : null}

      {typeof rating !== "undefined" && rating > 6 ? (
        <>
          <BiHappyBeaming className={cn(iconClassName, "bg-green-200")} />
          <span className="mt-2">{"Satisfied"}</span>
        </>
      ) : null}
    </section>
  );
}

export default ProductAvgRating;
