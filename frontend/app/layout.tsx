import type { Metadata } from "next";
import { Inter, Saira_Semi_Condensed } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utls/ReactQueryProvider";
import axios from "axios";
import { MyThemeProvider } from "@/utls/ThemeProvider";
import Drawer from "@/components/drawer";


axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const saira_semi_condensed = Saira_Semi_Condensed({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
          <body className={saira_semi_condensed.className}>
          <MyThemeProvider>
            {children}
            </MyThemeProvider>
          </body>
        
      </ReactQueryProvider>
    </html>
  );
}
