import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { sanitize } from "express-mongo-sanitize";

export async function POST(request: Request) {
  try {
    await mongooseConnect();

    const { name, review, rating, productId } = sanitize(await request.json());

    const newReview = await Review.create({
      userName: name,
      reviewText: review,
      rating,
      product: productId,
    });
    console.log(newReview);

    return Response.json({ status: 200, data: newReview });
  } catch (err) {
    return Response.json({ error: getErrorMessage(err), status: 500 });
  }
}
