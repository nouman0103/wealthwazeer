"use client";
import React from "react";
import Image from "next/image";
import Logo_BlackOutline from "../assets/Logo_BlackOutline.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-between p-6">
      <div className="flex">
        <Image src={Logo_BlackOutline} alt="Logo" height={60} />
        <text className="my-auto ml-3 text-3xl font-bold">WealthWazeer</text>
      </div>
      <nav className="ml-auto my-auto mr-3">
        <ul className="flex gap-6 text-3xl font-bold">
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            {
              pathname === "/signup"  ? (
                <Link href="/login" prefetch={true}>Login</Link>
              ) : (
                <Link href="/signup" prefetch={true}>Sign Up</Link>
              )
            
            }
           
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
