import prisma from "@/Utils/connect";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req, { params }) => {
  const { orderId } = params;
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.id },
      });
      console.log(
        `Payment intent created successfully for order ID: ${orderId}`
      );
      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        {
          status: 200,
        }
      );
    } else {
      console.error(`Order with ID ${orderId} not found`);
      return new NextResponse(JSON.stringify({ message: "Order not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
};
