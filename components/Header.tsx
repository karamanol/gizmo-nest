"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { productsInCart } = useCart();

  return (
    // <header className="bg-gradient-to-r from-gray-500 to-neutral-800 ">
    <header className="bg-neutral-800">
      <div className="center flex items-center justify-between">
        <Link href={"/"} className="flex items-center text-2xl gap-2 p-1">
          <Image
            src={"/logo-gizmo.png"}
            width={60}
            height={60}
            alt="GizmoNest logo"
            quality={90}
          />
          <span className="text-[#306c8a]">GizmoNest</span>
        </Link>
        <nav className="flex gap-3 text-gray-300/70 text-lg">
          <Link href={"/"}>Homepage</Link>
          <Link href={"/products"}>All products</Link>
          <Link href={"/categories"}>Categories</Link>
          <Link href={"/account"}>Account</Link>
          <Link href={"/cart"}>Cart ({productsInCart.length})</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
