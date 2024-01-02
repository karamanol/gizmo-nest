import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(request.url);

    const searchString = searchParams.get("searchString");
    if (searchString && searchString.length > 2) {
      const products = await Product.find({
        name: { $regex: new RegExp(searchString, "i") },
      }).limit(5);
      return Response.json({ status: 200, data: products });
    }

    return Response.json({ status: 404, data: "No products found" });
  } catch (err) {
    console.log(err);
    return Response.json({ error: getErrorMessage(err), status: 404 });
  }
}
