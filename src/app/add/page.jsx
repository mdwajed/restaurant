"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState([]);
  const [file, setFile] = useState();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e) => {
    const target = e.target;
    const item = target.files[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "restaurant");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/wajed/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
          options,
        }),
      });

      const data = await res.json();

      // router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="px-2 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-red-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 w-full">
        <h1 className=" font-bold">Add New Products</h1>
        <div className="w-full flex flex-col gap-2 " onChange={handleChangeImg}>
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input type="file" id="file" className="hidden" />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Description</label>
          <textarea
            className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            row={3}
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="30"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Category</label>
          <input
            className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Pizzas"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="md:flex gap-2">
            <div className=" md:flex mb-2">
              <input
                className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
                type="text"
                placeholder="Title"
                name="title"
                onChange={changeOption}
              />
              <input
                className="ring-1 ring-red-200 p-2 rounded-sm placeholder:text-red-200 outline-none"
                type="number"
                placeholder="Additional Price"
                name="additionalPrice"
                onChange={changeOption}
              />
            </div>
            <button
              className="bg-red-500    h-11 flex items-center justify-center text-white rounded-md  w-48"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap ">
            {options.map((opt) => (
              <div
                key={opt.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== opt.title)
                  )
                }
              >
                <span>{opt.title}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white w-48 rounded-md relative h-11 flex items-center justify-center -mt-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;
