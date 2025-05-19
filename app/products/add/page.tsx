"use client";

import EditImage from "@/app/components/EditImage";
import Toast from "@/app/components/Toast";
import { getAccessToken } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [cogs, setCogs] = useState("0")
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([
    { url: "" }, // Default image structure
  ]);
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [toggleSave, setToggleSave] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const router = useRouter();

  const handleAddImage = () => {
    setImages((prev) => [...prev, { url: "" }]);
  };

  const handleUndo = () => {
    window.location.reload();
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to add this product?"
    );
    if (!confirmed) return;

    const newProduct = {
      name: title,
      category: category,
      stock: stock,
      description: description,
      images: images,
      price: Number(price),
      originalPrice: Number(originalPrice),
      cogs: Number(cogs)
    };
    try {
      const accessToken = getAccessToken()
      console.log(JSON.stringify(newProduct, null, 2))
      const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setShowSaveToast(true);
        setToggleSave(false);
        router.push("/products");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="m-20">
      {showSaveToast && (
        <Toast
          color="green"
          message="Product updated successfully!"
          onClose={() => setShowSaveToast(false)}
        />
      )}
      {showDeleteToast && (
        <Toast
          color="red"
          message="Product successfully deleted!"
          onClose={() => setShowDeleteToast(false)}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Add Product</h1>
        {toggleSave && (
          <button className="btn" onClick={handleUndo}>
            Undo Changes
          </button>
        )}
      </div>
      <div className="my-10 bg-gray-100 p-5 rounded-lg">
        <form
          onChange={() => setToggleSave(true)}
          onSubmit={(e) => handleAddProduct(e)}
        >
          <div className=" border-red-100">
            <div className="flex w-full">
              <div className="flex-col w-3/4 pr-25">
                <label>
                  <strong>Title</strong>
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  placeholder="Product Name"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
              <div className="flex-col w-1/4 pr-25">
                <label>
                  <strong>COGS</strong>
                </label>
                <input
                  onChange={(e) => setCogs(e.target.value)}
                  value={cogs}
                  placeholder="Cost of goods sold"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col my-5 w-2/5">
                <label>
                  <strong>Category</strong>
                </label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  placeholder="Category"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
              <div className="flex flex-col my-5 w-2/5">
                <label>
                  <strong>Stock</strong>
                </label>
                <input
                  type="number"
                  onChange={(e) => setStock(Number(e.target.value))}
                  value={stock}
                  placeholder="ex: 1"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="w-full rounded-lg">
                <label>
                  <strong>Description</strong>
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="bg-white w-full h-40 my-2.5 p-1"
                  placeholder="Description..."
                ></textarea>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <div className="flex flex-col my-5 w-2/5">
                <label>
                  <strong>Price</strong>
                </label>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="$249.99"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
              <div className="flex flex-col my-5 w-2/5">
                <label>
                  <strong>Compare at price</strong>
                </label>
                <input
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  value={originalPrice}
                  placeholder="$349.99"
                  className="bg-white w-full my-2.5 rounded-lg p-1"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div className="w-full">
              {images.map((image, index) => (
                <EditImage
                  setToggleSave={setToggleSave}
                  key={index}
                  index={index}
                  image={image}
                  setImages={setImages}
                />
              ))}
              <div className="flex justify-center my-5">
                <button
                  type="button"
                  className="border-2 p-3 rounded-full px-5 font-extrabold"
                  onClick={handleAddImage}
                >
                  + Add Image
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <input
              disabled={!toggleSave}
              value="Add Product"
              type="submit"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
