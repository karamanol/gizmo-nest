// "use server";
"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/providers/TanstackProvider";
const CartContextProvider = dynamic(() => import("../context/CartContext"), {
  ssr: false,
});

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <TanstackProvider>
      <CartContextProvider>
        <Toaster position="top-right" />
        <Header />
        <div className="bg-gray-100 min-h-screen">{children}</div>
      </CartContextProvider>
    </TanstackProvider>
  );
}

export default Layout;
