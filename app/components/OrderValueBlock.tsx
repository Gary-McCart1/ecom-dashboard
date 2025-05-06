"use client";

import React, { useEffect, useState } from "react";
import fetchAllOrders from "../utils/fetchOrders";

const SalesBlock = () => {
  const [avgValue, setAvgValue] = useState("");

  useEffect(() => {
    async function calculateStats() {
      const orders = await fetchAllOrders();
      let totalSales = 0;
      for (let i = 0; i < orders.length; i++){
        totalSales += Number(orders[i].total)
      }
      
      const avgTotal = totalSales / orders.length;

      const formatted = avgTotal.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  
      if (avgTotal) setAvgValue(formatted);
      else setAvgValue("$0.00");
    }
  
    calculateStats();
  }, []);

  return (
    <div className="p-3 flex flex-col justify-between rounded-lg bg-gray-100 h-40">
      <div>
        <div>
          <strong>Average Order Value</strong>
        </div>
        <div className="flex items-center w-full text-3xl">
          <h3>
            <strong>{avgValue}</strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SalesBlock;
