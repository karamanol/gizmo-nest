// import { CartContextProvider } from "@/context/CartContext";
import dynamic from "next/dynamic";
import Header from "./Header";
import { Toaster } from "react-hot-toast";
const CartContextProvider = dynamic(() => import("../context/CartContext"), {
  ssr: false,
});

type LayoutProps = { children: React.ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <CartContextProvider>
      <Toaster position="top-right" />
      <Header />
      <div className="bg-gray-100 min-h-screen">{children}</div>
    </CartContextProvider>
  );
}

export default Layout;
