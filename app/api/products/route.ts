import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getErrorMessage } from "@/utils/getErrorMessage";
import mongoose, { MongooseError } from "mongoose";
import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // fetches products by id's in request body
  try {
    await mongooseConnect();
    const productsId = await request.json();

    const products = await Product.find({ _id: { $in: productsId } });
    return Response.json({ status: 200, data: products });
  } catch (err) {
    return Response.json({ error: getErrorMessage(err), status: 500 });
  }
}

const sortDB = {
  new_first: { createdAt: -1 },
  old_first: { createdAt: 1 },
  cheap_first: { price: 1 },
  expensive_first: { price: -1 },
  discounted_first: { discount: -1 },
};

export async function GET(request: NextRequest) {
  try {
    await mongooseConnect();
    // when get one product by id in params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (id) {
      const product = await Product.findById(id).populate({
        path: "category",
        // populate: { path: "parentCat" },
      });
      return Response.json({ status: 200, data: product });
    }

    // when get many products
    const _page = parseInt(searchParams.get("page") || "1") || 1;
    const page = _page > 0 ? _page : 1; // must be greater than 0

    const _limit = parseInt(searchParams.get("limit") || "20") || 20;
    const limit = _limit > 0 && _limit <= 100 ? _limit : 100; // must be greater than 0 and less than 101

    const _sort = searchParams.get("sort") || "new_first";
    const sort = Object.keys(sortDB).includes(_sort)
      ? //@ts-ignore
        sortDB[_sort]
      : sortDB["new_first"];

    const skip = (page - 1) * limit;

    const priceRange = searchParams.get("priceRange"); // ex: 100-500
    const [maxPrice, minPrice] = priceRange?.split("-") || [];

    const category = searchParams.get("categoryId") || "";

    let categoryId: string[] = [category]; // when one id is specified
    if (category.includes("_")) categoryId = category.split("_"); // if many id's divided with _

    let aggregationPipeline = [];

    // Add price range filter if available
    if (maxPrice && minPrice) {
      aggregationPipeline.push({
        $match: {
          price: {
            $gte: parseInt(maxPrice) || 0,
            $lte: parseInt(minPrice) || 99999999999999,
          },
        },
      });
    }

    // Conditionally add the $match stage if at least one category is specified, otherwise skip stage
    if (categoryId[0]) {
      // Convert string IDs to ObjectIds
      const objectIds = categoryId.map((id) => new mongoose.Types.ObjectId(id));

      aggregationPipeline.push({
        $match: { category: { $in: objectIds } },
      });
    }

    const products = await Product.aggregate([
      ...aggregationPipeline,

      {
        $addFields: {
          soldoutOrder: {
            $cond: { if: "$soldout", then: 1, else: 0 },
          },
        },
      },
      {
        $sort: { soldoutOrder: 1, ...sort },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit + 1,
      },
    ]);

    return Response.json({ status: 200, data: products });
  } catch (err) {
    if (err) {
      console.log(err);
      return Response.json({ error: getErrorMessage(err), status: 500 });
    }
  }
}
