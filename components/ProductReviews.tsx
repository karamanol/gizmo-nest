import { cn } from "@/lib/cn";
import UserReview from "./UserReview";
import { RiUserHeartLine } from "react-icons/ri";
import { RiUserVoiceLine } from "react-icons/ri";

type ReviewType = {
  _id: string;
  product: string;
  userName: string;
  reviewText: string;
  rating: number;
  createdAt: Date;
};

type ProductReviewsProps = {
  className?: string;
  reviewsArray?: ReviewType[];
};

function ProductReviews({ className, reviewsArray }: ProductReviewsProps) {
  return (
    <section className={cn("center pt-4", className)}>
      <div className="bg-white rounded-md p-4">
        <h2 className="flex items-center gap-3 mb-6">
          <RiUserVoiceLine className="h-6 w-6 text-slate-800" />
          <span className="font-semibold text-lg">
            Latest feedback from our users:
          </span>
        </h2>
        <div className="flex flex-col gap-3">
          {Array.isArray(reviewsArray) && reviewsArray.length > 0 ? (
            reviewsArray.map((review) => (
              <UserReview review={review} key={review._id} />
            ))
          ) : (
            <span className="text-gray-700">
              This product is awaiting its first review. Could it be yours?
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductReviews;
