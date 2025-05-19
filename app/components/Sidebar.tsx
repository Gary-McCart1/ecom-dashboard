"use client";

import { IoHomeOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GoPackageDependents } from "react-icons/go";

import Link from "next/link";
import Logout from "./Logout";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const Sidebar = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) return;

  return (
    <div className="w-60 h-screen bg-slate-900 flex flex-col items-center justify-evenly text-xl font-extralight text-zinc-50 rounded-r-lg">
      
      {/* Logo & Home */}
      <div className="flex items-center w-full px-4 py-4 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg space-x-4">
        <Image
          src="/white-logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <Link href="/" className="flex items-center text-lg font-light">
          <IoHomeOutline className="mr-3 text-2xl" />
          Home
        </Link>
      </div>

      {/* Main Links */}
      <div className="w-full flex flex-col items-center space-y-2">
        <Link href="/orders" className="flex items-center w-full px-4 py-3 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <GoPackageDependents className="mr-4 text-2xl" />
          Orders
        </Link>
        <Link href="/products" className="flex items-center w-full px-4 py-3 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <HiOutlineShoppingBag className="mr-4 text-2xl" />
          Products
        </Link>
        <Link href="/messages" className="flex items-center w-full px-4 py-3 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <MdOutlineMarkEmailUnread className="mr-4 text-2xl" />
          Messages
        </Link>
      </div>

      {/* Logout */}
      <div className="w-full px-4 py-3 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
