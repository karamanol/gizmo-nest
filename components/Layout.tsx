// "use server";
"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/providers/TanstackProvider";
import Footer from "./Footer";
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
        <div className="bg-gray-100 min-h-screen pb-16">{children}</div>
        <Footer />
      </CartContextProvider>
    </TanstackProvider>
  );
}

export default Layout;
