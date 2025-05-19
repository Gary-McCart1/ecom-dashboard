"use client";

import React, { useEffect, useState } from "react";
import { Order } from "../types/order";
import UpdateOrder from "./UpdateOrder";
import StatusBadge from "./StatusBadge";
import Link from "next/link";
import getCookie from "../utils/getCookie";
import { getAccessToken } from "../utils/auth";

interface Props {
  orderId: number;
}
const accessToken = getAccessToken()

const csrfToken = getCookie("csrftoken");

const headers: Record<string, string> = {
  "Content-Type": "application/json",
  'Authorization': `Bearer ${accessToken}`
};

if (csrfToken) {
  headers["X-CSRFToken"] = csrfToken;
}


const OrderRow = ({ orderId }: Props) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${orderId}`);
        if (!response.ok) return;

        const text = await response.text();
        if (!text) throw new Error("No order found with that id");

        const data = JSON.parse(text);
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleStatusUpdate = async (newStatus: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to change the status to ${newStatus.toLowerCase()}?`
    );
    if (!confirmed) return;
    if (!order) return;
    const updatedOrder = { ...order, status: newStatus };
    setOrder(updatedOrder); // Optimistic update

    try {
      const res = await fetch(`https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${order.id}/`, {
        method: "PUT",
        credentials: "include",
        headers,
        body: JSON.stringify( updatedOrder ),
      });
      if (!res.ok) {
        console.error("Failed to update status");
        setOrder(order); // Rollback on failure
      }
    } catch (err) {
      console.error(err);
      setOrder(order);
    }
  };

  if (!order) return <tr></tr>;

  return (
    <tr>
      <td>{order.id}</td>
      <td>
        <div className="font-bold">{order.name}</div>
      </td>
      <td>${order.total}</td>
      <td>
        <StatusBadge status={order.status} />
      </td>
      <td>{order.date.split("T")[0]}</td>
      <td>
        <UpdateOrder
          currentStatus={order.status}
          onUpdateStatus={handleStatusUpdate}
        />
      </td>
      <td>
      <button className="btn btn-ghost btn-s">
          <Link href={`/orders/${order.id}`}>Details</Link>
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
