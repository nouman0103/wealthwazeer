import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../components/header"
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "../components/darkMode";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WealthWazeer - Sign Up",
  description: "Create an account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <ThemeProvider theme={darkTheme}>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
