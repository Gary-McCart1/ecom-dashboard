import React from "react";
import OrderTable from "../components/OrderTable";
import ProtectedRoute from "../components/ProtextedRoute";

const Orders = () => {
  return (
    <ProtectedRoute>
      <div className="m-20 text-zinc-950">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Orders</h1>
          <div className="m-5 p-0 flex justify-end">
            {/* <button className="w-25 btn btn-s">+ Add</button> */}
          </div>
        </div>
        <OrderTable />
      </div>
    </ProtectedRoute>
  );
};

export default Orders;
