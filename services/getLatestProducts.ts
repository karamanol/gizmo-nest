import { Product } from "@/models/Product";
import { ProductType } from "./getOneProductById";

export async function getLatestUpdatedProducts(limit: number) {
  const latestProducts: ProductType[] = await Product.aggregate([
    {
      $sort: {
        updatedAt: 1, // 1 means ascending
      },
    },
    { $limit: limit },
  ]);

  return latestProducts;
}
