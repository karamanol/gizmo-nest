import { Product } from "@/models/Product";
import { ProductType } from "./getOneProductById";
import { mongooseConnect } from "@/lib/mongoose";
import { getErrorMessage } from "@/utils/getErrorMessage";

export async function getLatestUpdatedProducts(limit: number) {
  try {
    await mongooseConnect();
    const latestProducts: ProductType[] = await Product.aggregate([
      {
        $addFields: {
          soldoutOrder: {
            $cond: { if: "$soldout", then: 1, else: 0 },
          },
        },
      },
      {
        $sort: { soldoutOrder: 1, createdAt: -1 },
      },
      {
        $limit: limit,
      },
    ]);

    return latestProducts;
  } catch (err) {
    console.log(getErrorMessage(err));
  }
}
