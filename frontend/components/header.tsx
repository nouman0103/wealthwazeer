"use client";
import React, {useState} from "react";
import Image from "next/image";
import Logo_BlackOutline from "../assets/Logo_BlackOutline.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal, Button } from "@mui/material";


const Header: React.FC = () => {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  
  return (
    <div>
      <header className="flex fixed z-30 w-full justify-around gap-16 p-2  bg-glassmorphic-gradient border-b border-white border-opacity-10 backdrop-blur-lg shadow-glassmorphic">
        <Link href="/signup" prefetch={true} className="flex ml-auto">
          <Image src={Logo_BlackOutline} alt="Logo" height={40} />
          <text className="my-auto ml-3 text-xl font-semibold">
            WealthWazeer
          </text>
        </Link>
        <nav className="mr-auto my-auto">
          <ul className="flex gap-7 text-lg text-opacity-80 text-white font-medium">
            <li>
            <Link href="#" onClick={handleOpenModal}>About</Link>
            </li>
            <li>
              {pathname === "/signup" ? (
                <Link href="/login" prefetch={true}>
                  Login
                </Link>
              ) : (
                <Link href="/signup" prefetch={true}>
                  Sign Up
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <div className="h-20"></div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="bg-glassmorphic-gradient p-4 rounded-3xl border border-opacity-5 border-white shadow-glassmorphic w-96 mx-auto mt-24">
          <h2 id="modal-modal-title" className="text-3xl font-semibold mb-4">
            About WealthWazeer
          </h2>
          <p id="modal-modal-description" className="text-xl text-white">
            This is some text about WealthWazeer.
          </p>  
        </div>
      </Modal>
    </div>
  );
};

export default Header;
