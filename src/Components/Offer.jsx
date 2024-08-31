import Image from "next/image";
import React from "react";
import CountDown from "./Countdown";

const Offer = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-black md:bg-[url('/offerBg.png')] md:justify-between md:h-[70vh] ">
      {/* TEXT */}
      <div className="flex-1 flex flex-col gap-4 md:gap-8 justify-center items-start text-white p-4 md:pl-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:7xl font-bold">
          Delicious Burger & French Fry
        </h1>
        <p className="xl:text-xl">
          Progressively simplify effective e-toilers and process-centric methods
          of empowerment. Quickly pontificate parallel.
        </p>
        <CountDown />
        <button className="bg-red-600 px-6 py-3 rounded-md">Order Now</button>
      </div>
      {/* IMAGE */}
      <div className="flex-1 relative w-full md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
