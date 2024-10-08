"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const Delete = ({ id }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <p>Loading.....</p>;
  }
  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      router.push("/menu");
      toast("Product deleted successfully");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };
  return (
    <button
      className="absolute bg-red-900 top-4 right-4 rounded-full p-2"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={16} height={16} />
    </button>
  );
};

export default Delete;
