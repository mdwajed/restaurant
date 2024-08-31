import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Image from "next/image";
import Link from "next/link";

const getData = async (category) => {
  const res = await fetch(
    `http://localhost:3000/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return res.json();
};
const CategoryPage = async ({ params }) => {
  const products = await getData(params.category);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  group">
      {products.map((item) => (
        <Link href={`product/${item.id}`} key={item.id}>
          <Card className="w-full h-96">
        { item.img &&   <AspectRatio ratio="1" minHeight="200px">
              <Image
                src={item.img}
                alt=""
                width={250}
                height={250}
                className="object-cover w-full h-auto"
              />
            </AspectRatio>}
            <div className="flex justify-between items-center text-red-600 font-bold mt-4">
              <div className="text-base uppercase group-hover:hidden">
                {item.title}
              </div>
              <div className="text-base"> $ {item.price}</div>
              <Button
                color="danger"
                size="sm"
                className="hidden group-hover:block"
              >
                <p className="text-xs font-bold uppercase">add to cart</p>
              </Button>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
