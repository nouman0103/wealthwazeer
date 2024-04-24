"use client";

import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface AccountCardProps {
  accountName: string;
  money: number;
}
export const AccountCard = ({ accountName, money }: AccountCardProps) => {
  return (
    <div className="flex mx-auto pt-3 pl-2 pb-3 pr-10 w-64 bg-glassmorphic-gradient rounded-3xl border-solid border-1 backdrop-filter backdrop-blur-sm shadow-glassmorphic">
      <div className="flex flex-col gap-x-8 gap-y-7 p-6">
        <text className="text-xl text-white text-opacity-70 font-medium leading-3 text-left align-middle overflow-visible break-word">
          {accountName}
        </text>
        <text className="text-2xl text-white font-lg">PKR {money}</text>
      </div>
    </div>
  );
};

export const AddAccountCard = () => {
  return (
    <div className="flex w-64 mx-auto bg-glassmorphic-gradient rounded-3xl border-4 border-dashed border-gray-500 transform transition-transform duration-500 ease-in-out motion-safe:hover:scale-110 justify-center items-center">
      <div className="flex flex-col gap-x-8 gap-y-7 p-6">
        <text className="text-2xl text-white text-opacity-70 font-medium text-center">
          New Account
        </text>
        <div className="flex justify-center">
          <AddIcon />
        </div>
      </div>
    </div>
  );
};