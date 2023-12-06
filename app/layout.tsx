import type { Metadata } from "next";
// import { Roboto_Condensed } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

// const roboto = Roboto_Condensed({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GizmoNest",
  description:
    "Discover the latest tech devices at our e-commerce store. Offering a wide range of high-quality products, secure transactions, and fast delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
