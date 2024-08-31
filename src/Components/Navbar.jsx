import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="h-12 flex justify-between items-center text-red-600 border-b-2 border-b-red-600 uppercase p-4 md:h-24 lg:px-20 xl:px-40">
      {/* RIGHT  MENU */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href="/">fiasta</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      <div className="hidden md:flex items-center justify-end  gap-4 flex-1">
        <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 bg-orange-300 px-1  cursor-pointer rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>555 77 00</span>
        </div>
      <UserLinks/>
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
