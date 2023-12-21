import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MongooseError } from "mongoose";
import { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // fetches products for cart
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

    // console.log(page);
    // const products = await Product.find()
    //   .skip(skip)
    //   .limit(limit + 1)
    //   .sort(sort);

    const products = await Product.aggregate([
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

    // console.log(products);
    // console.log("page", page);
    // console.log("limit", limit);
    // console.log("sort", sort);
    return Response.json({ status: 200, data: products });
  } catch (err) {
    if (err) {
      return Response.json({ error: getErrorMessage(err), status: 500 });
    }
  }
}
