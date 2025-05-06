import React from "react";
import MessageTable from "../components/MessageTable";
import ProtectedRoute from "../components/ProtextedRoute";

const Messages = () => {
  return (
    <ProtectedRoute>
      <div className="m-20 text-zinc-950">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Messages</h1>
        </div>
        <MessageTable />
      </div>
    </ProtectedRoute>
  );
};

export default Messages;
