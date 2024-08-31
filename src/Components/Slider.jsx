"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in NY",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];
const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row bg-fuchsia-50 w-full">
      {/* TEXT */}
      <div className="flex-1 gap-8 font-bold flex flex-col justify-center items-center p-4 md:p-10">
        <h1 className="text-4xl sm:text-5xl text-center md:text-6xl lg:7xl text-red-600  uppercase ">
          {data[currentSlide].title}
        </h1>
        <button className="bg-red-600 px-8 py-4 text-white">Order Now</button>
      </div>
      {/* IMAGE */}
      <div className="flex-1 w-full relative ">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
