"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderBlock = () => {
  const [orderCount, setOrderCount] = useState();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        const data = await response.json();
        setOrderCount(data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  });
  return (
    <div className="p-3 flex flex-col justify-between rounded-lg bg-gray-100 h-40">
      <div>
        <div>
          <strong>Total orders</strong>
        </div>
        <div className="flex items-center w-full text-3xl">
          <h3>
            <strong>{orderCount}</strong>
          </h3>
        </div>
      </div>
      <div>
        <Link href={"/orders"}>View all orders &rarr;</Link>
      </div>
    </div>
  );
};

export default OrderBlock;
