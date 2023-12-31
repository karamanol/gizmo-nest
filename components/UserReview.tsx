import { FaStar } from "react-icons/fa";

type UserReviewProps = {
  review: {
    _id: string;
    product: string;
    userName: string;
    reviewText: string;
    rating: number;
    createdAt: Date;
  };
};

function UserReview({ review }: UserReviewProps) {
  const date = new Date(review.createdAt);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based in js
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return (
    <article
      key={review._id}
      className="bg-slate-50 border border-slate-100 rounded-md p-3">
      <div className="flex flex-col gap-3">
        <div className=" flex items-center gap-3 ">
          <div className="h-8 w-8 bg-slate-500 rounded-full flex justify-center items-center shadow-sm">
            <span className="uppercase text-gray-50">{review.userName[0]}</span>
          </div>
          <span className="font-semibold min-w-[6rem] ">{review.userName}</span>
          <div className="flex items-center gap-[2px] p-2">
            {[...Array(10)].map((_item, index) => {
              const currentStarRating = index + 1;
              return (
                <FaStar
                  key={index}
                  className={
                    currentStarRating <= review.rating
                      ? "text-yellow-600/70"
                      : "text-gray-300"
                  }
                />
              );
            })}
            <span className="ml-2 w-3 font-bold">{review.rating}</span>
          </div>
          <span className="ml-auto">{formattedDate}</span>
        </div>
        <p>{review.reviewText}</p>
      </div>
    </article>
  );
}

export default UserReview;
