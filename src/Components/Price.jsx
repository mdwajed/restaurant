"use client";
import { singleProduct } from "@/data";
import React, { useState, useEffect } from "react";

const Price = () => {
  const [total, setTotal] = useState(singleProduct.price);
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTotal(
      quantity *
        (singleProduct.options
          ? singleProduct.price +
            singleProduct.options[selected].additionalPrice
          : singleProduct.price)
    );
  }, [selected, quantity]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <h1 className="text-2xl font-bold">$ {total.toFixed(2)}</h1>
      {/* OPTION */}
      <div className="flex gap-2  md:gap-6 xl:gap-8">
        {singleProduct.options.map((option, index) => (
          <button
            key={option.title}
            className=" w-24 px-4 md:px-6 py-2 ring-1 ring-red-600 rounded-md "
            style={{
              background: selected === index ? "rgb(248 113 113)" : "white",
              color: selected === index ? "white" : "red",
            }}
            onClick={() => setSelected(index)}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY & ADD BUTTON */}
      <div className="flex ">
        <div className="flex justify-between items-center p-3 ring-1 ring-red-600 w-[70%]">
          <p className="">Quantity</p>
          <div className="flex gap-2 md:gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              className=""
            >
              {"<"}
            </button>
            <span className="">{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
              className=""
            >
              {">"}
            </button>
          </div>
        </div>
        <button className="uppercase bg-red-600 text-white p-2 w-[30%] text-xs md:text-sm ring-1 ring-red-600">
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Price;
