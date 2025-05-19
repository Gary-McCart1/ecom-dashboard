import React from "react";
import { OrderItem } from "../types/orderItems";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";

interface Props {
  item: OrderItem;
}

const ProductCard = ({ item }: Props) => {
  console.log(item)
  if (!item) return <Loading />
  const imageUrl = item.product?.images?.[0]?.url ?? "";

  return (
    <div className="my-10">
      <div className="card card-side bg-white shadow-sm">
        <figure>
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt="Movie"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.product.name} - {item.product.category}
          </h2>
          <p>Rating: {item.product.rating}/5.0</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.product.price}</p>
          <p dangerouslySetInnerHTML={{
                __html: item.product.description.substring(0, 150) + "...",
              }}></p>
          <div className="card-actions justify-end">
            <Link href={`/products/${item.product.id}`}>
              <button className="btn btn-black">View Product</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
