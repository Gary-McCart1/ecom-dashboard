"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../types/product";
import ProductRow from "./ProductRow";
import axios from "axios";

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ordering, setOrdering] = useState("id");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          ordering: ordering,
        };

        const response = await axios.get(
          "http://localhost:8000/api/products/",
          {
            params,
          }
        );
        setProducts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [ordering]);

  return (
    <div className="mt-10">
      <div className="flex mb-5 items-center">
        <h2 className="text-xl font-bold">Sort By</h2>
        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="border p-2 rounded ml-3"
        >
          <option value="id">Sort by ID (Default)</option>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
          <option value="category">Category A → Z</option>
          <option value="-category">Category Z → A</option>
          <option value="rating">Rating (Low to High)</option>
          <option value="-rating">Rating (High to Low)</option>
          <option value="stock">Stock (Low to High)</option>
          <option value="-stock">Stock (High to Low)</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead className="text-zinc-950">
            <tr>
              <th className="text-lg">ID</th>
              <th className="text-lg">Name</th>
              <th className="text-lg">Price</th>
              <th className="text-lg">Rating</th>
              <th className="text-lg">Category</th>
              <th className="text-lg">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
