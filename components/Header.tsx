"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Share_Tech } from "next/font/google";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/cn";
import SearchBar from "./SearchBar";
const font = Share_Tech({ weight: "400", subsets: ["latin"] });

function Header() {
  const { productsInCart, favouriteProducts } = useCart();
  const pathName = usePathname();

  return (
    // <header className="bg-gradient-to-r from-gray-500 to-neutral-800 ">
    <header className="bg-gray-800">
      <div className="mx-auto px-6 flex h-20 items-center justify-between">
        <div className="flex gap-5 items-center">
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

          <SearchBar />
        </div>

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
              pathName.startsWith("/categories") ? "header-link-active" : ""
            )}>
            Categories
          </Link>

          <Link
            href={"/favourites"}
            className={cn(
              "header-link",
              pathName === "/favourites" ? "header-link-active" : ""
            )}>
            Favourites ({favouriteProducts.length})
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
