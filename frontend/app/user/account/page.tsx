"use client";

import { AccountCard, AddAccountCard } from "@/components/card";
import Divider from "@mui/material/Divider";

export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
      <div className="flex justify-between">
        <text className="text-2xl font-semibold text-white text-opacity-80 my-auto">
          Accounts
        </text>
      </div>

      <div className="flex flex-row flex-wrap gap-8">
        <div className="flex flex-col flex-wrap gap-8">
          <text className="text-xl font-semibold text-white ">
            Bank Accounts
          </text>
          <AccountCard accountName="Account 1" money={1000} />
          <AccountCard accountName="Account 2" money={2000} />
          <AddAccountCard />
        </div>
        <Divider orientation="vertical" flexItem />

        <div className="flex flex-col flex-wrap gap-8">
          <text className="text-xl font-semibold text-white">
            Income Accounts
          </text>
          <AccountCard accountName="Account 1" money={1000} />
          <AccountCard accountName="Account 2" money={2000} />
          <AddAccountCard />
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-col flex-wrap gap-8">
          <text className="text-xl font-semibold text-white ">
            Expense Accounts
          </text>
          <AccountCard accountName="Account 1" money={1000} />
          <AccountCard accountName="Account 2" money={2000} />
          <AddAccountCard />
        </div>
      </div>
    </div>
  );
}
