"use client";
import React from "react";
import Image from "next/image";
import Logo_BlackOutline from "../assets/Logo_BlackOutline.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <div>
    <header className="flex fixed z-30 w-full justify-around gap-16 p-2  bg-white bg-opacity-[2%] border-b border-white border-opacity-10 backdrop-blur-lg shadow-sm">
      <div className="flex ml-auto">
        <Image src={Logo_BlackOutline} alt="Logo" height={50} />
        <text className="my-auto ml-3 text-2xl font-bold">WealthWazeer</text>
      </div>
      <nav className="mr-auto my-auto">
        <ul className="flex gap-7 text-2xl text-opacity-80 text-white font-semibold">
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
    <div className="h-20">

    </div>
    </div>

  );
};

export default Header;
