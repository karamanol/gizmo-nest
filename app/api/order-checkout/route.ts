import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import { Product } from "@/models/Product";
import { Types } from "mongoose";

export const dynamic = "force-dynamic";

const pricesFromDBSchema = z.array(
  z.object({
    _id: z.custom<Types.ObjectId>(),
    name: z.string(),
    price: z.number(),
    discount: z.number(),
  })
);

const ProductDataSchema = z.object({
  _id: z.string(),
  category: z.string().optional(),
  quantity: z.number(),
  name: z.string(),
});

const InputsDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  city: z.string(),
  postcode: z.string(),
  address: z.string(),
  country: z.string(),
  number: z.string(),
});

const RequestDataSchema = z.object({
  inputsData: InputsDataSchema,
  productsData: z.array(ProductDataSchema),
});

export async function POST(request: NextRequest) {
  try {
    await mongooseConnect();
    const data = await request.json();

    const parsed = RequestDataSchema.parse(data);

    // prices can be faked, so we need to get prices from db
    const pricesFromDB = await Product.find(
      {
        _id: {
          $in: parsed.productsData.map((prod) => prod._id),
        },
      },
      { name: 1, price: 1, discount: 1 }
    );
    if (!pricesFromDB.length) throw new Error("No prices found in database");
    const parsedPricesFromDB = pricesFromDBSchema.parse(pricesFromDB);

    if (!process.env.STRIPE_SECRET_TEST_KEY)
      throw new Error("Stripe secret key is not set");
    const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

    const newOrder = await Order.create({
      ...parsed.inputsData,
      paid: false,
      delivered: false,
      orderedProducts: parsed.productsData,
    });

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: parsed.productsData.map((parsedProd) => {
        const prodFromDB = parsedPricesFromDB?.find(
          (item) => `${item._id}` === parsedProd._id
        );
        const prodPriceInCents =
          // @ts-ignore
          (prodFromDB?.price - prodFromDB?.discount) * 100;

        return {
          price_data: {
            currency: "USD",
            product_data: { name: parsedProd.name },
            unit_amount: prodPriceInCents,
          },
          quantity: parsedProd.quantity,
        };
      }),
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/cart?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart?success=false`,
      customer_email: parsed.inputsData.email,
      metadata: { orderId: `${newOrder._id}` },
    });

    return NextResponse.json({ urlTorRedirect: stripeSession.url });
  } catch (err) {
    return Response.json({ error: getErrorMessage(err), status: 500 });
  }
}
