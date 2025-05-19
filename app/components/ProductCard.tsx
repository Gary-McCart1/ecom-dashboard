"use client";
import React, { useEffect, useState } from "react";
import { OrderItem } from "../types/orderItems";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
import { Product } from "../types/product";

interface Props {
  item: OrderItem;
}

const ProductCard = ({ item }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!item?.product) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://foamhead-a8f24bda0c5b.herokuapp.com/api/products/${item.product}`
        );
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [item.product]);

  if (!item || !product) return <Loading />;

  return (
    <div className="my-10">
      <div className="card card-side bg-white shadow-sm">
        <figure>
          <Image
            src={product.images[0].url}
            width={150}
            height={150}
            alt={product.name}
            className="object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name} - {product.category}
          </h2>
          <p>Rating: {product.rating}/5.0</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${product.price}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: product.description.substring(0, 150) + "...",
            }}
          ></p>
          <div className="card-actions justify-end">
            <Link href={`/products/${product.id}`}>
              <button className="btn btn-black">View Product</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
