"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Order } from "../types/order";
import OrderRow from "./OrderRow";
import axios from "axios";

const OrderTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState("-date");
  const [status, setStatus] = useState<string>(""); // Status filter

  // Use useCallback to prevent the fetchOrders function from being recreated on every render
  const fetchOrders = useCallback(
    async (url = "http://localhost:8000/api/orders/") => {
      try {
        setLoading(true);
        const params: { [key: string]: string } = {
          ordering: ordering,
        };

        if (status) {
          params.status = status; // Add status to the query params
        }

        const response = await axios.get(url, {
          params,
        });

        setOrders(response.data.results);
        setNextPage(response.data.next); // Set the next page URL
        setPrevPage(response.data.previous); // Set the previous page URL
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [ordering, status]
  ); // Include ordering and status as dependencies

  // Fetch orders when the component mounts or ordering/status changes
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Only run when fetchOrders changes

  return (
    <div className="mt-10">
      {/* Sort Dropdown */}
      <div className="flex justify-between">
        <div className="flex mb-5 items-center">
          <h2 className="text-xl font-bold">Sort By</h2>
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="border p-2 rounded ml-3"
          >
            <option value="-date">Sort by Date (Newest to Oldest)</option>
            <option value="date">Sort by Date (Oldest to Newest)</option>
            <option value="id">Sort by ID (Default)</option>
            <option value="-total">Total (High to Low)</option>
            <option value="total">Total (Low to High)</option>
            <option value="name">Customer Name A → Z</option>
            <option value="-name">Customer Name Z → A</option>
          </select>
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex mb-5 items-center">
          <h2 className="text-xl font-bold">Filter by Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded ml-3"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      {/* Table of Orders */}
      <div className="overflow-x-scroll overflow-y-scroll max-h-[screen]">
        {loading ? (
          <div className="w-full h-[600px] flex justify-center items-center">
            <span className="loading loading-spinner w-[80px] h-[80px]"></span>
          </div>
        ) : (
          <table className="table w-full">
            {/* Table Header */}
            <thead className="text-zinc-950">
              <tr>
                <th className="text-lg">ID</th>
                <th className="text-lg">Customer</th>
                <th className="text-lg">Total</th>
                <th className="text-lg">Status</th>
                <th className="text-lg">Date</th>
                <th className="text-lg">Update Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {orders.map((order, index) => (
                <OrderRow key={index} orderId={order.id} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => prevPage && fetchOrders(prevPage)}
          disabled={!prevPage}
          className="btn btn-outline"
        >
          Previous
        </button>
        <button
          onClick={() => nextPage && fetchOrders(nextPage)}
          disabled={!nextPage}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
