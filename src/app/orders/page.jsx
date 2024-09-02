"use client";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleUpdate = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements[0];
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("The Order Status Updated Successfully");
  };

  if (isLoading || status === "loading") return "Loading...";
  if (error) return "An error occurred while fetching the data.";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-1 md:border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            // <tr
            //   className={`text-sm md:text-base ${
            //     item.status === "delivered" ? "bg-gray-500" : "bg-red-50"
            //   }`}
            //   key={item.id}
            // >
            <tr
              className={`text-sm md:text-base ${
                (item.status || "").toLowerCase() === "delivered"
                  ? "bg-gray-200"
                  : "bg-red-100"
              }`}
              key={item.id}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products[0].Title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-center gap-1 md:gap-4"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      className="p-2 ring-1 ring-red-100 rounded-md outline-none"
                      type="text"
                      name=""
                      placeholder={item.status}
                    />
                    <button
                      type="submit"
                      className="bg-red-600 p-2 rounded-full"
                    >
                      <Image src="/edit.png" alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
