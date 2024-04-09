import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utls/ReactQueryProvider";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
      <body className={inter.className}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
