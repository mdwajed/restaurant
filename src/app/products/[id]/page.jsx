import Delete from "@/Components/Delete";
import Price from "@/Components/Price";
import Image from "next/image";
import React from "react";

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return res.json();
};
const SingleProductPage = async ({ params }) => {
  const singleProduct = await getData(params.id);
  console.log(singleProduct);
  return (
    <div className="h-screen p-4 lg:px-20 xl:px-40 flex flex-col md:items-center md:gap-8 justify-around md:flex-row text-red-600 relative">
      {/* IMAGE */}
      {singleProduct.img && (
        <div className="flex-1 relative md:h-[70%]">
          <Image
            src={singleProduct?.img}
            alt={singleProduct.id}
            fill
            className="object-contain"
          />
        </div>
      )}
      {/* TEXT */}
      <div className="flex-1 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
        <h1 className="text-3xl xl:text-5xl font-bold">
          {singleProduct.title}
        </h1>
        <p className="">{singleProduct.desc}</p>
        <Price product={singleProduct}/>
      </div>
      <Delete id={singleProduct.id}/>
    </div>
  );
};

export default SingleProductPage;
