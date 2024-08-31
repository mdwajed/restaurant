"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/workinghours" },
  { id: 4, title: "Contact", url: "/contact" },
];
const Menu = () => {
  const [open, setOpen] = useState(false);
  // TODO
  const user = false;
  return (
    <div>
      {!open ? (
        <Image
          src="/open.png"
          alt="menu img"
          width={20}
          height={20}
          onClick={() => setOpen(true)}
        />
      ) : (
        <Image
          src="/close.png"
          alt="menu img"
          width={20}
          height={20}
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div className="absolute flex flex-col gap-8 justify-center items-center bg-red-600 z-10 text-white text-xl w-full left-0 top-24 h-[calc(100vh-6rem)]">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
          {!user ? (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          ) : (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          )}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
          <div className=" flex gap-2 bg-orange-300 px-1  items-center cursor-pointer rounded-md">
        <Image src="/phone.png" alt="" width={20} height={20} />
        <span>555 77 00</span>
      </div>
        </div>
      )}
   
    </div>
  );
};

export default Menu;
