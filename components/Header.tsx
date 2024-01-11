"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Share_Tech } from "next/font/google";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import SearchBar from "./SearchBar";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const font = Share_Tech({ weight: "400", subsets: ["latin"] });

function Header() {
  const [isActiveMobileNavigation, setIsActiveMobileNavigation] =
    useState(false);
  const { productsInCart, favouriteProducts } = useCart();
  const pathName = usePathname();

  const hideMobileNav = () => {
    setIsActiveMobileNavigation(false);
  };

  return (
    <header
      className={cn(
        " relative bg-gray-800 flex items-center sm:block min-w-[350px] ",
        isActiveMobileNavigation
          ? "move-down-animation flex-col h-[150%] w-full fixed bg-gradient-to-b from-slate-800 to-slate-700 z-50"
          : "sm:h-28 lg:h-fit"
      )}>
      <button
        aria-label="Open navigation"
        className={cn(
          "w-16 h-16  flex justify-center items-center sm:hidden absolute",
          isActiveMobileNavigation ? "left-0 top-0 sm:flex" : ""
        )}
        type="button"
        onClick={() => setIsActiveMobileNavigation((is) => !is)}>
        <IoMenu
          className={cn(
            "h-10 w-10 text-gray-50",
            isActiveMobileNavigation ? "mt-4" : ""
          )}
        />
      </button>

      <div
        className={cn(
          "mx-auto px-6 sm:px-3 md:px-6 lg:px-2 xl:px-6 flex items-center  justify-between sm:flex-col",
          isActiveMobileNavigation ? "h-fit flex-col gap-3" : "h-20 lg:flex-row"
        )}>
        <div
          className={cn(
            "flex gap-5  items-center justify-center",
            isActiveMobileNavigation ? "flex-col" : "md:gap-32 lg:gap-5"
          )}>
          <Link
            href={"/"}
            className={cn(
              "flex items-center text-2xl gap-2 p-1 ",
              isActiveMobileNavigation ? "mt-2" : ""
            )}
            onClick={hideMobileNav}>
            <Image
              src={"/logo-gizmo.png"}
              width={60}
              height={60}
              alt="GizmoNest logo"
              quality={90}
            />
            <div className="flex flex-col justify-center items-center">
              <span
                className={`${font.className} tracking-widest text-3xl lg:text-xl xl:text-3xl text-[#306c8a] font-bold`}>
                GizmoNest
              </span>
              <span className="text-base -mt-2 tracking-widest lg:tracking-tighter xl:tracking-widest whitespace-nowrap text-slate-600 ">
                smart shopping
              </span>
            </div>
          </Link>

          <SearchBar
            isOpenMobileView={isActiveMobileNavigation}
            setIsOpenMobileView={setIsActiveMobileNavigation}
            className={cn(
              "hidden sm:block   ",
              isActiveMobileNavigation ? "block m-0" : ""
            )}
          />
        </div>

        <nav
          className={cn(
            "hidden sm:flex gap-3 sm:gap-7 sm:mt-1 lg:mt-0 lg:gap-3 whitespace-nowrap",
            isActiveMobileNavigation
              ? "flex flex-col w-[80%] mt-5"
              : "md:gap-14 lg:gap-1 xl:gap-3 "
          )}>
          <Link
            onClick={hideMobileNav}
            href={"/"}
            className={cn(
              "header-link",
              pathName === "/" ? "header-link-active" : "",
              isActiveMobileNavigation ? "!text-3xl" : "lg:text-sm xl:text-base"
            )}>
            Homepage
          </Link>

          <Link
            onClick={hideMobileNav}
            href={"/products"}
            className={cn(
              "header-link",
              pathName === "/products" ? "header-link-active" : "",
              isActiveMobileNavigation ? "!text-3xl" : "lg:text-sm xl:text-base"
            )}>
            All products
          </Link>

          <Link
            onClick={hideMobileNav}
            href={"/categories"}
            className={cn(
              "header-link",
              pathName.startsWith("/categories") ? "header-link-active" : "",
              isActiveMobileNavigation ? "!text-3xl" : "lg:text-sm xl:text-base"
            )}>
            Categories
          </Link>

          <Link
            onClick={hideMobileNav}
            href={"/favourites"}
            className={cn(
              "header-link",
              pathName === "/favourites" ? "header-link-active" : "",
              isActiveMobileNavigation ? "!text-3xl" : "lg:text-sm xl:text-base"
            )}>
            Favourites <span className="w-8">({favouriteProducts.length})</span>
          </Link>

          <Link
            onClick={hideMobileNav}
            href={"/cart"}
            className={cn(
              "header-link",
              pathName === "/cart" ? "header-link-active" : "",
              isActiveMobileNavigation ? "!text-3xl" : "lg:text-sm xl:text-base"
            )}>
            Cart <span className="w-8">({productsInCart.length})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
