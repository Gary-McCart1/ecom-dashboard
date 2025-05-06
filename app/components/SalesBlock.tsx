"use client";

import React, { useEffect, useState } from "react";
import fetchAllOrders from "../utils/fetchOrders";

const SalesBlock = () => {
  const [salesTotal, setSalesTotal] = useState("");

  useEffect(() => {
    const calculateTotalSales = async () => {
      const orders = await fetchAllOrders();
      let totalSales = 0;
      for (let i = 0; i < orders.length; i++) {
        totalSales += Number(orders[i].total);
      }
      const formatted = totalSales.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      
      setSalesTotal(formatted);
    };
    calculateTotalSales();
  }, []);
  return (
    <div className="p-3 flex flex-col justify-between rounded-lg bg-gray-100 h-40">
      <div>
        <div>
          <strong>Total sales</strong>
        </div>
        <div className="flex items-center w-full text-3xl">
          <h3>
            <strong>{salesTotal}</strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SalesBlock;
