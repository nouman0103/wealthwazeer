import type { Metadata } from "next";
import Drawer from "@/components/drawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen bg-dark-bg-gr-to-purple flex">
        <Drawer />
        {children}
        </main>
    </>
    );
}
