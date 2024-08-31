"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Loginpage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading.....</p>;
  }
  if (status === "authenticated") {
    router.push("/");
  }
  if (status === "unauthenticated") {
    router.push("/login");
  }
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}

      <div className="h-full flex flex-col shadow-2xl rounded-md md:flex-row  md:w-full md:h-[80%] lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:w-1/2 md:h-full">
          <Image src="/loginBg.png" alt="" fill className="object-cover" />
        </div>
        {/* TEXT CONTAINER */}
        <div className="flex flex-col gap-8 p-8 md:w-1/2">
          <h1 className="text-xl font-bold xl:text-3xl">Welcome</h1>
          <p className="">
            Log into your account or create a new one using social buttons
          </p>
          <button
            className="flex gap-4 items-center ring-1 ring-orange-100 p-4"
            onClick={() => signIn("google")}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
          <button className="flex gap-4 items-center ring-1 ring-orange-100 p-4">
            <Image
              src="/facebook.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Facebook</span>
          </button>
          <p className="">
            Have a problem ?{" "}
            <Link className="underline" href="/">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
