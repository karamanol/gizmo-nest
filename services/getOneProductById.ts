import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
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
    }
  | undefined
  | null;

export async function getOneProductById(id: string) {
  if (!id) return;
  try {
    await mongooseConnect();
    const product: ProductType = await Product.findById(id);
    return product;
  } catch (err) {
    console.error(getErrorMessage(err));
  }
}
