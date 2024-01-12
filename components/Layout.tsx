"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/providers/TanstackProvider";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
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
        <div className="bg-gray-100 min-h-screen pb-16 min-w-[350px] overflow-x-auto">
          {children}
        </div>
        <ScrollToTop />
        <Footer />
      </CartContextProvider>
    </TanstackProvider>
  );
}

export default Layout;
