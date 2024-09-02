"use client";
import { useCartStore } from "@/Utils/store";
import { Avatar } from "@mui/joy";
import React from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-600 lg:flex-row">
      {/* PRODUCT CONTAINER */}
      <div className="flex flex-col gap-8 p-4 justify-center lg:w-2/3 2xl:w-1/2 lg:h-full lg:px-20 xl:px-40">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            {item.img && <Avatar src={item.img} alt="" className="w-16 h-16" />}
            <div className="">
              <h1 className="uppercase text-base sm:text-xl  font-bold">
                {item.title}
              </h1>
              <p className="">{item.optionTitle}</p>
            </div>
            <p className="font-bold">$ {item.price}</p>
            <p
              className="text-xl cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              x
            </p>
          </div>
        ))}
      </div>
      {/* PAYMENT */}
      <div className="flex flex-col gap-4 bg-gray-100 justify-center p-4 lg:w-1/3 2xl:w-1/2 text-sm 2xl:text-xl lg:h-full lg:px-20 xl:px-40 2xl:gap-6">
        <div className="flex justify-between">
          <h1 className="">Subtotal({totalItems}items)</h1>
          <p className=""> $ {totalPrice}</p>
        </div>
        <div className="flex justify-between">
          <h1 className="">Service Cost</h1>
          <p className=""> $ 00.00</p>
        </div>
        <div className="flex justify-between">
          <h1 className="">Delivery Cost</h1>
          <p className="uppercase text-green-500"> Free</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <h1 className="uppercase">Total(inc.vat)</h1>
          <p className=""> $ 81.70</p>
        </div>
        <button className="uppercase text-base bg-red-600 text-white py-3 self-end  w-32 rounded-md">
          checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
