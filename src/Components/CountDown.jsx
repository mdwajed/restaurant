"use client";
import React from "react";
import Countdown from "react-countdown";
const endingDate = new Date("2024-07-20");
const CountDown = () => {
  return (
    <Countdown
      className="text-yellow-400 text-4xl font-bold"
      date={endingDate}
    />
  );
};

export default CountDown;
