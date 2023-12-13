import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST_KEY || "";

export async function POST(request: Request) {
  try {
    await mongooseConnect();

    if (!process.env.STRIPE_SECRET_TEST_KEY) {
      throw new Error("Stripe secret key is not set");
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

    const sig = request.headers.get("stripe-signature") ?? "";

    const body = await request.text();

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json({
        status: 400,
        error: `Webhook Error: ${getErrorMessage(err)}`,
      });
    }

    // Handle the event
    switch (event.type) {
      // namely in checkout.session.completed event type i can access metadata where i stored orderId
      case "checkout.session.completed":
        console.log("checkout.session.completed", event.data.object);
        const orderId = event.data.object.metadata?.orderId;
        const isPaid = event.data.object.payment_status === "paid";

        if (orderId && isPaid) {
          await Order.findByIdAndUpdate(orderId, {
            paid: true,
          });
          return NextResponse.json({ status: 200 });
        }
        return NextResponse.json({ status: 200 });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        return NextResponse.json({ status: 200 });
    }
  } catch (err) {
    console.log(getErrorMessage(err));
    return NextResponse.json({
      status: 500,
      error: `Webhook Error: ${getErrorMessage(err)}`,
    });
  }
}
