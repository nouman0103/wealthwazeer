import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "WealthWazeer - Login",
    description: "WealthWazeer - Login",
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
