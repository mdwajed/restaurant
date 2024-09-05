"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const payment_intent = searchParam.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [payment_intent, router]);
  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
      </div>
    </>
  );
};

export default SuccessPage;
