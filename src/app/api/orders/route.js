import { getAuthSession } from "@/Utils/auth";
import prisma from "@/Utils/connect";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  const session = await getAuthSession();
  console.log(session);
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email,
        },
      });

      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "something went wrong" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated" }),
      { status: 401 }
    );
  }
};
export const POST = () => {
  return new NextResponse("Hello", { status: 200 });
};
