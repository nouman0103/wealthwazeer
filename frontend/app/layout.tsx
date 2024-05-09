import { Inter, Saira_Semi_Condensed } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utls/ReactQueryProvider";
import axios from "axios";
import { MyThemeProvider } from "@/utls/ThemeProvider";
import { AuthProvider } from "@/context/AuthContex";
import { NextFont } from "next/dist/compiled/@next/font";
import { Metadata,Viewport } from "next";

const saira_semi_condensed: NextFont = Saira_Semi_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WealthWazeer",
  description: "WealthWazeer - Your Personal Finance Manager",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  
  authors: [
    {
      name: "Nouman Iqbal"
    },
    {
      name: "Mian Abdullah"
    },
    {
      name: "Muhammad Abdul Rehman Khan"
    },
    {
      name: "Mah Rukh"
    }
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={saira_semi_condensed.className}>
          <AuthProvider>
            <MyThemeProvider>{children}</MyThemeProvider>
          </AuthProvider>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
