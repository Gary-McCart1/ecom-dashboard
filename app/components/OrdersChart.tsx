"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { OrdersAndSales } from "../utils/formatOrdersByDate";
import fetchAllOrders from "../utils/fetchOrders";
import "react-datepicker/dist/react-datepicker.css";

const baseButton =
  "mx-2 px-4 py-2 rounded-md border transition-colors duration-200";
const filled = "bg-slate-900 text-white border-slate-900";
const hollow = "bg-transparent text-slate-900 border-slate-900";

const OrdersChart = () => {
  const [ordersData, setOrdersData] = useState<
    { date: number; total: number }[]
  >([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [activeRange, setActiveRange] = useState("all");

  useEffect(() => {
    const fetchAndFormatOrders = async () => {
      const res = await fetchAllOrders(); // Fetch all orders
      const formattedOrders = OrdersAndSales(res);
      setOrdersData(formattedOrders);
    };

    fetchAndFormatOrders();
  }, []);

  // Filter orders data based on selected date range
  const filteredData = ordersData.filter((order) => {
    const orderDate = new Date(order.date);
    if (startDate && orderDate < startDate) return false; // Before start date
    if (endDate && orderDate > endDate) return false; // After end date
    return true; // Include if within the date range
  });

  // Handle preset date ranges
  const handlePresetRange = (range: string) => {
    setActiveRange(range); // Track active
    const today = new Date();
    let newStartDate: Date | null = null;
    let newEndDate: Date | null = today;

    switch (range) {
      case "all":
        newStartDate = null;
        newEndDate = null;
        break;
      case "pastYear":
        newStartDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        break;
      case "past3Months":
        newStartDate = new Date(
          today.getFullYear(),
          today.getMonth() - 3,
          today.getDate()
        );
        break;
      case "pastMonth":
        newStartDate = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  return (
    <div className="bg-gray-100 my-10 rounded-lg p-5">
      <h2 className="text-center m-3 text-xl font-extrabold">
        Sales Over Time
      </h2>
      <div className="flex justify-center mb-5">
        {/* Buttons for Preset Date Ranges */}
        <button
          onClick={() => handlePresetRange("all")}
          className={`${baseButton} ${activeRange === "all" ? filled : hollow}`}
        >
          All Time
        </button>
        <button
          onClick={() => handlePresetRange("pastYear")}
          className={`${baseButton} ${
            activeRange === "pastYear" ? filled : hollow
          }`}
        >
          Past Year
        </button>
        <button
          onClick={() => handlePresetRange("past3Months")}
          className={`${baseButton} ${
            activeRange === "past3Months" ? filled : hollow
          }`}
        >
          Past 3 Months
        </button>
        <button
          onClick={() => handlePresetRange("pastMonth")}
          className={`${baseButton} ${
            activeRange === "pastMonth" ? filled : hollow
          }`}
        >
          Past Month
        </button>

        {/* Custom Date Range */}
      </div>

      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={filteredData}
            margin={{ top: 30, right: 30, left: 20, bottom: 40 }}
          >
            {/* Grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              label={{
                position: "insideBottomRight",
                offset: -5,
              }}
              tick={({ x, y, payload }) => {
                const date = new Date(payload.value);
                const label = date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "2-digit",
                });

                return (
                  <text
                    x={x}
                    y={y}
                    dy={10}
                    textAnchor="end"
                    transform={`rotate(-30, ${x}, ${y})`}
                    fontSize={15}
                    fill="#333"
                  >
                    {label}
                  </text>
                );
              }}
            />

            {/* Y Axis with currency formatting */}
            <YAxis
              allowDecimals={false}
              tickFormatter={(tick) => `$${tick.toFixed(2)}`} // Format as currency
            />

            {/* Tooltip with custom formatting */}
            <Tooltip
              formatter={(value) => `$${Number(value).toFixed(2)}`} // Format the value as currency
              labelFormatter={(label) => {
                const date = new Date(label);
                return `${
                  date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()}`;
              }}
            />

            {/* Line with improved style */}
            <Line
              type="monotone"
              dataKey="total"
              stroke="#008ea3"
              strokeWidth={3} // Thicker line
              dot={false} // Remove dots from data points
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
