"use client";

import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface AccountCardProps {
  accountName: string;
  money: number;
}

export const AccountCard = ({ accountName, money }: AccountCardProps) => {
  return (
    <div className="flex flex-col px-8 py-8 gap-4 mx-auto w-64 bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic">
      <span className="text-xl text-white text-opacity-50 font-medium truncate">
        {accountName}
      </span>
      <div className="flex gap-3">
        <span className="text-sm font-semibold mt-3 text-white">RS</span>
        <span className="text-3xl font-semibold text-white font-lg">
          {money.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export const AddAccountCard = ({
  accountType,
  onClick,
}: {
  accountType: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex flex-col w-64 px-2 py-8 gap-4 mx-auto bg-white bg-opacity-[1%] rounded-3xl border-4 border-dashed border-white border-opacity-15 transition-all hover:bg-glassmorphic-gradient-hover scale-100 hover:scale-105 active:scale-100 active:bg-black active:bg-opacity-10"
      onClick={onClick}
    >
      <text className="text-xl text-white text-opacity-50 text-center">
        New {accountType.toLowerCase()} account
      </text>
      <AddIcon className="text-2xl text-white text-opacity-50 mx-auto" />
    </div>
  );
};
