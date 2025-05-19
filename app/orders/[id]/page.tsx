"use client";

import ProductCard from "@/app/components/ProductCard";
import StatusBadge from "@/app/components/StatusBadge";
import Toast from "@/app/components/Toast";
import { Order } from "@/app/types/order";
import { OrderItem } from "@/app/types/orderItems";
import { Product } from "@/app/types/product";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtextedRoute";
import { getAccessToken } from "@/app/utils/auth";

const ProductPage = () => {
  const [order, setOrder] = useState<Order>();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<string>();

  const [toggleSave, setToggleSave] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);

  const router = useRouter();

  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchOrder = async () => {
      const orderResponse = await fetch(
        `https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${id}`
      );
      if (!orderResponse.ok) {
        console.error("Failed to fetch message", orderResponse.status);
        return;
      }
      const text = await orderResponse.text();
      if (!text) {
        console.warn("No data returned from API");
        return;
      }
      try {
        const data = JSON.parse(text);
        setOrder(data);
        setName(data.name);
        setEmail(data.email);
        setAddress(data.address);
        setPhone(data.phone);
        if (data.date) {
          setDate(data.date.split("T")[0]);
        } else {
          console.warn("Order date is missing:", data);
        }

        setStatus(data.status);
        setShippingMethod(data.shippingMethod);
        setTrackingNumber(data.trackingNumber);
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    };

    const fetchOrderItems = async () => {
      const itemResponse = await fetch(
        `https://foamhead-a8f24bda0c5b.herokuapp.com/api/orderitems/${id}/`
      );
      if (!itemResponse.ok) {
        console.error("Failed to fetch message", itemResponse.status);
        return;
      }
      const text = await itemResponse.text();
      if (!text) {
        console.warn("No data returned from API");
        return;
      }
      try {
        const data = JSON.parse(text);
        setOrderItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
    fetchOrderItems();
  }, [id]);

  const handleUndo = () => {
    window.location.reload();
  };

  const handleDeleteOrder = async (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmed) return;
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${id}/`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        setShowDeleteToast(true);
        setToggleSave(false);
        router.push("/orders");
      } else {
        console.error("Failed to delete the order", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to edit this order?"
    );
    if (!confirmed) return;
    const updated = {
      id: Number(order?.id),
      name,
      email,
      address,
      phone,
      date,
      status,
      shippingMethod,
      trackingNumber,
      products: products.map((p) => p.id),
      total: Number(total) || 0,
    };
    try {
      const accessToken = getAccessToken();
      const response = await fetch(
        `https://foamhead-a8f24bda0c5b.herokuapp.com/api/orders/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updated),
        }
      );

      if (response.ok) {
        setShowSaveToast(true);
        setOrder(updated);
        setToggleSave(false);
      } else {
        setOrder(order);
      }
    } catch (error) {
      console.error(error);
      setOrder(order);
    }
    setToggleSave(false);
  };

  return (
    <ProtectedRoute>
      <div className="m-20">
        {showSaveToast && (
          <Toast
            color="green"
            message="Order updated successfully!"
            onClose={() => setShowSaveToast(false)}
          />
        )}
        {showDeleteToast && (
          <Toast
            color="red"
            message="Order successfully deleted!"
            onClose={() => setShowDeleteToast(false)}
          />
        )}
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit Order</h1>
          {toggleSave && (
            <button className="btn" onClick={handleUndo}>
              Undo Changes
            </button>
          )}
        </div>
        {order ? (
          <div className="my-10 bg-gray-100 p-5 rounded-lg">
            <div className="flex justify-between">
              <div className="w-1/2">
                <h2 className="my-3 text-2xl font-bold">Contact Info</h2>
                <div className="flex justify-start mx-15 my-8">
                  <div className="mr-20">
                    <label>
                      <strong>Name</strong>
                    </label>
                    <p>{name}</p>
                  </div>
                  <div>
                    <label>
                      <strong>Email</strong>
                    </label>
                    <p>{email}</p>
                  </div>
                </div>
                <div className="flex justify-start mx-15 my-5">
                  <div className="mr-12">
                    <label>
                      <strong>Phone</strong>
                    </label>
                    <p>{phone}</p>
                  </div>
                  <div>
                    <label>
                      <strong>Address</strong>
                    </label>
                    <p>{address}</p>
                  </div>
                </div>
              </div>
              <form
                className="w-2/3"
                onChange={() => setToggleSave(true)}
                onSubmit={(e) => handleEditOrder(e)}
              >
                <div className="my-2 flex-col w-full items-center">
                  <div className="flex w-full justify-around">
                    <div className="flex-col">
                      <label>
                        <strong>Order Total</strong>
                      </label>
                      <p>${total}</p>
                    </div>
                    <div className="flex-col">
                      <label>
                        <strong>Order Date</strong>
                      </label>
                      <p>{date}</p>
                    </div>
                    <div className="flex-col justify-between">
                      <label className="mx-2">Status</label>
                      <StatusBadge status={status} />
                      <div className="flex justify-center">
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                          className="bg-white w-full my-2.5 rounded-lg p-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="ml-22">
                    <div className="flex-col">
                      <label>
                        <strong>Shipping Method</strong>
                      </label>
                      <div>
                        <input
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="bg-white w-88/100 my-2.5 rounded-lg p-1"
                          type="text"
                          value={shippingMethod}
                        />
                      </div>
                    </div>
                    <div className="flex-col">
                      <label>
                        <strong>Tracking Number</strong>
                      </label>
                      <div>
                        <input
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          className="bg-white w-88/100 my-2.5 rounded-lg p-1"
                          type="text"
                          value={trackingNumber}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <div className="flex justify-between items-center mt-5">
                <h2 className="my-3 text-2xl font-bold">Order Info</h2>
                <h3 className="my-3 text-xl font-bold mr-25">
                  Total: ${total}
                </h3>
              </div>
              {(orderItems ?? []).map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
            </div>

            <form onSubmit={(e) => handleEditOrder(e)}>
              <div className="flex justify-between">
                <input
                  type="button"
                  onClick={(e) => handleDeleteOrder(e)}
                  value="Delete Order"
                  className="btn btn-error"
                />
                <input
                  disabled={!toggleSave}
                  value="Save Changes"
                  type="submit"
                  className="btn btn-success"
                />
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full h-[600px] flex justify-center items-center">
            <span className="loading loading-spinner w-[80px] h-[80px]"></span>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ProductPage;
