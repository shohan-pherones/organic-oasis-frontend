"use client";

import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { items } = useCart();
  const { user, logoutDispatcher } = useAuth();

  const navItems = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/categories">Categories</Link>
      </li>
      <li>
        <Link href="/products">Products</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-primary h-16 max-h-16 sticky top-0 left-0 right-0 z-50">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Organic Oasis
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </nav>
      <nav className="navbar-end gap-5">
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar mt-2">
              <div className="w-10 rounded-full">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={512}
                  height={512}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-52 p-2 shadow"
            >
              <li>
                <Link
                  href={`/users/profile/${user._id}`}
                  className="flex flex-col items-start"
                >
                  <span className="whitespace-nowrap font-bold">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="opacity-50 text-xs -mt-3">
                    @{user.username}
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/orders" className="flex flex-col items-start">
                  My Orders
                </Link>
              </li>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link href="/admin/create/categories">Create Category</Link>
                  </li>
                  <li>
                    <Link href="/admin/create/products">Create Products</Link>
                  </li>
                  <li>
                    <Link href="/admin/manage/categories">
                      Manage Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin/manage/products">Manage Products</Link>
                  </li>
                  <li>
                    <Link href="/admin/manage/users">Manage Users</Link>
                  </li>
                  <li>
                    <Link href="/admin/manage/orders">Manage Orders</Link>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => logoutDispatcher()}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        <Link href="/cart" className="relative">
          <ShoppingCart className="text-accent" />
          <span className="absolute -left-2 -bottom-2 w-5 h-5 bg-accent-content rounded-full text-accent flex items-center justify-center text-xs font-semibold">
            {items.length}
          </span>
        </Link>
        {!user?.name && (
          <Link href="/sign-in" className="btn btn-accent">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
