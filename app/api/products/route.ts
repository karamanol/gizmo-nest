import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { MongooseError } from "mongoose";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await mongooseConnect();
  try {
    const productsId = await request.json();

    const products = await Product.find({ _id: { $in: productsId } });
    return Response.json({ status: 200, data: products });
  } catch (err) {
    if (err instanceof Error || err instanceof MongooseError) {
      return Response.json({ error: err.message, status: 500 });
    }
  }
}
