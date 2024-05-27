import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WealthWazeer - Signup",
    description: "WealthWazeer - Signup",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}</>);
}
