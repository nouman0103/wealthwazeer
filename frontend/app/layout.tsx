import { Inter, Saira_Semi_Condensed } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/utls/ReactQueryProvider";
import axios from "axios";
import { MyThemeProvider } from "@/utls/ThemeProvider";
import { AuthProvider } from "@/context/AuthContex";
import { NextFont } from "next/dist/compiled/@next/font";

const saira_semi_condensed:NextFont = Saira_Semi_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


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
