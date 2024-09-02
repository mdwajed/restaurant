import prisma from "@/Utils/connect";

export const PUT = async (req, { params }) => {
  const { id } = params;
  try {
    const body = await req.json();
    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order Updated Successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Somethind wenr wrong" }),
      { status: 401 }
    );
  }
};
