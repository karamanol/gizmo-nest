import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { ProductType } from "@/services/server/getOneProductById";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest } from "next/server";

const defaultPromotedAmount = "3";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const amountParam = parseInt(
    searchParams.get("amount") || defaultPromotedAmount
  );
  const amount =
    1 >= amountParam && amountParam <= 10
      ? amountParam
      : parseInt(defaultPromotedAmount);
  try {
    await mongooseConnect();
    const products: ProductType[] = await Product.aggregate([
      { $match: { promoted: true } },
      {
        $sort: { createdAt: 1 },
      },
      {
        $limit: amount,
      },
    ]);

    return Response.json({ status: 200, data: products });
  } catch (err) {
    if (err) {
      return Response.json({ error: getErrorMessage(err), status: 500 });
    }
  }
}
