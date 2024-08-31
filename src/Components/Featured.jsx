import Image from "next/image";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed to fetch");
  }
  return res.json();
};
const Featured = async () => {
  const featuredProducts = await getData();
  return (
    <div className="w-full overflow-scroll no-scrollbar text-red-600">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-orange-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
                <Image src={item.img} alt="" fill className="object-contain" />
              </div>
            )}
            {/* TEXT CINTAINER */}
            <div className="flex-1 flex flex-col gap-2 md:gap-4  items-center justify-center text-center">
              <h1 className="uppercase text-xl xl:text-2xl 2xl:text-3xl font-bold">
                {item.title}
              </h1>
              <p className="px-4 2xl:p-8">{item.desc}</p>
              <span className="textt-xl font-bold">$ {item.price}</span>
              <button className="bg-red-600 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
