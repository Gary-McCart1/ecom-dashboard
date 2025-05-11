"use client";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth(); // Use the logout function from the context

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      // The logout function in AuthContext handles state update and redirection
      console.log("Logout successful");
    } else {
      console.error("Logout failed");
      // Optionally display an error message to the user
    }
  };

  return (
    <button onClick={handleLogout} className="flex w-5/8 items-center">
      <TbLogout2 className="text-left mr-5 text-3xl" />
      Logout
    </button>
  );
};

export default Logout;