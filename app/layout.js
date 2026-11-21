import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "DemoKart – Electronics, Fashion, Home & Books at great prices",
  description: "Shop top-rated electronics, fashion, home essentials and books at DemoKart. Great deals, easy returns and fast delivery across India.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900"><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
