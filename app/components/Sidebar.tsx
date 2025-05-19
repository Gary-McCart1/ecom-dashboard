"use client";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { GoPackageDependents } from "react-icons/go";

import Link from "next/link";
import Logout from "./Logout";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { LuLayoutDashboard } from "react-icons/lu";

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
    <div className="w-60 h-screen border-solid bg-slate-900 flex flex-col items-center justify-evenly text-xl font-extralight text-zinc-50 rounded-r-lg text-thin">
      <Link href="/">
        <Image
          src="/white-logo.png"
          alt="Foamhead Logo"
          height={250}
          width={250}
        />
      </Link>

      <div className="w-60 h-2/5 flex flex-col items-center justify-around">
        <div className="flex justify-center w-95/100 h-12 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <Link href="/" className="flex w-5/8 items-center">
            <LuLayoutDashboard className="text-left mr-5 text-3xl" />
            Dashboard
          </Link>
        </div>
        <div className="flex justify-center w-95/100 h-12 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <Link href="/orders" className="flex w-5/8 items-center">
            <GoPackageDependents className="text-left mr-5 text-3xl" />
            Orders
          </Link>
        </div>
        <div className="flex justify-center w-95/100 h-12 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <Link href="/products" className="flex w-5/8 items-center">
            <HiOutlineShoppingBag className="text-left mr-5 text-3xl" />
            Products
          </Link>
        </div>
        <div className="flex justify-center w-95/100 h-12 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
          <Link href="/messages" className="flex w-5/8 items-center">
            <MdOutlineMarkEmailUnread className="text-left mr-5 text-3xl" />
            Messages
          </Link>
        </div>
      </div>
      <div className="flex justify-center w-95/100 h-12 hover:bg-slate-50 hover:text-slate-900 hover:rounded-lg">
        <Logout />
      </div>
    </div>
  );
};

export default Sidebar;
