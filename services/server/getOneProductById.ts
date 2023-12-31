import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { getErrorMessage } from "@/utils/getErrorMessage";

export type ProductType =
  | {
      _id: string;
      name: string;
      description: string;
      price: number;
      images: string[];
      discount: number;
      category?: string;
      productProperties?: { [key: string]: string };
      updatedAt: Date;
      createdAt?: Date;
      specs?: string;
      soldout: boolean;
      promoted: boolean;
      reviews?: {
        _id: string;
        product: string;
        userName: string;
        reviewText: string;
        rating: number;
        createdAt: Date;
      }[];
      ratingsAverage?: number;
      ratingsQuantity?: number;
    }
  | undefined
  | null;

export async function getOneProductById(id: string) {
  if (!id) return;
  try {
    await mongooseConnect();
    const _review = Review; // looks like unused import, but needed to prevent mongoose error 'Schema hasn't been registered for model "Review"'

    const product = await Product.findOne({ _id: id }).populate({
      path: "reviews",
      select: "reviewText userName rating createdAt",
      options: { limit: 3, sort: { createdAt: -1 } },
    });

    return JSON.parse(JSON.stringify(product)) as ProductType;
  } catch (err) {
    console.error(getErrorMessage(err));
  }
}
