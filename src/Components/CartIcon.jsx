"use client";
import {  useCartStore } from "@/Utils/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
    // Reset totalItems to 0 if necessary
    // const cart = useCartStore.getState();
    // if (cart.totalItems !== 0) {
    //   useCartStore.setState(INITIAL_STATE);
    // }
  }, []);
  return (
    <Link href="/cart" className="flex items-center gap-2">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
