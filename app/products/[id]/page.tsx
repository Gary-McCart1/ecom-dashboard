"use client";

import EditImage from "@/app/components/EditImage";
import Toast from "@/app/components/Toast";
import { Product } from "@/app/types/product";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("");
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

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch message", response.status);
        return;
      }
      const text = await response.text();
      if (!text) {
        console.warn("No data returned from API");
        return;
      }
      try {
        const data = JSON.parse(text);
        setProduct(data);
        setTitle(data.name);
        setCategory(data.category);
        setStock(data.stock);
        setDescription(data.description);
        setImages(data.images);
        setPrice(data.price);
        setRating(data.rating)
        setOriginalPrice(data.originalPrice);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUndo = () => {
    window.location.reload();
  };

  const handleAddImage = () => {
    console.log("Adding an image");
    setImages((prev) => [...prev, { url: "" }]);
  };

  const handleDeleteProduct = async() => {
    console.log("Deleted product")
    try {
      const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/${id}/`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        setShowDeleteToast(true);
        setToggleSave(false);
        setTimeout(() => {
          router.push("/products"); // or your actual path
        }, 2000);
      } else {
        setProduct(product);
      }
    } catch (error) {
      console.error(error);
      setProduct(product);
    }
    setToggleSave(false);
  }

  const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to edit this product?"
    );
    console.log(id);
    if (!confirmed) return;
    const updated = {
      id: Number(id),
      name: title,
      category,
      stock,
      description,
      price: parseFloat(price) || 0,
      originalPrice: parseFloat(originalPrice) || 0,
      rating: product?.rating ?? 4,
      images: images,
    };
    try {
      const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/${id}/`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      if (response.ok) {
        setShowSaveToast(true);
        setProduct(updated);
        setToggleSave(false);
      } else {
        setProduct(product);
      }
    } catch (error) {
      console.error(error);
      setProduct(product);
    }
    setToggleSave(false);
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
        <h1 className="text-4xl font-bold">Edit Product</h1>
        {toggleSave && (
          <button className="btn" onClick={handleUndo}>
            Undo Changes
          </button>
        )}
      </div>
      <div className="my-10 bg-gray-100 p-5 rounded-lg">
        <form
          onChange={() => setToggleSave(true)}
          onSubmit={(e) => handleEditProduct(e)}
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
              <div className="flex-col w-1/5">
                <label>
                  <strong>Rating</strong>
                </label>
                <input
                  type="number"
                  onChange={(e) => setRating(Number(e.target.value))}
                  value={rating}
                  placeholder="Rating"
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
            <button className="btn btn-error" type="button" onClick={handleDeleteProduct}>
              Delete Product
            </button>
              
            
            <input
              disabled={!toggleSave}
              value="Save Changes"
              type="submit"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
