"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const res = await fetch("https://foamhead-a8f24bda0c5b.herokuapp.com/api/logout/", {
        method: "POST",
        credentials: "include", // Send cookies with the request
      });

      if (res.ok) {
        // On successful logout, reset the authentication state
        setIsAuthenticated(false);
        // Redirect to login page after logout
        router.push("/login");
      } else {
        console.error("Logout failed:", res.statusText);
      }
    } catch (err) {
      console.error("Logout error:", err);
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
