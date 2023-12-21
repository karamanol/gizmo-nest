"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Share_Tech } from "next/font/google";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
const font = Share_Tech({ weight: "400", subsets: ["latin"] });

function Header() {
  const { productsInCart } = useCart();
  const pathName = usePathname();
  console.log(pathName);

  return (
    // <header className="bg-gradient-to-r from-gray-500 to-neutral-800 ">
    <header className="bg-neutral-800">
      <div className="center flex h-20 items-center justify-between">
        <Link href={"/"} className="flex items-center text-2xl gap-2 p-1">
          <Image
            src={"/logo-gizmo.png"}
            width={60}
            height={60}
            alt="GizmoNest logo"
            quality={90}
          />
          <span
            className={`${font.className} tracking-widest text-3xl text-[#306c8a] font-bold`}>
            GizmoNest
          </span>
        </Link>
        <nav className="flex gap-3 ">
          <Link
            href={"/"}
            className={cn(
              "header-link",
              pathName === "/" ? "header-link-active" : ""
            )}>
            Homepage
          </Link>
          <Link
            href={"/products"}
            className={cn(
              "header-link",
              pathName === "/products" ? "header-link-active" : ""
            )}>
            All products
          </Link>
          <Link
            href={"/categories"}
            className={cn(
              "header-link",
              pathName === "/categories" ? "header-link-active" : ""
            )}>
            Categories
          </Link>
          <Link
            href={"/account"}
            className={cn(
              "header-link",
              pathName === "/account" ? "header-link-active" : ""
            )}>
            Account
          </Link>
          <Link
            href={"/cart"}
            className={cn(
              "header-link",
              pathName === "/cart" ? "header-link-active" : ""
            )}>
            Cart ({productsInCart.length})
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
