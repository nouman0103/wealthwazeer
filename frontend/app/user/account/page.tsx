"use client";

import { AccountCard, AddAccountCard } from "@/components/card";
import { useAuth } from "@/context/AuthContex";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
type Account = {
  name: string;
  balance: number;
  account_type: "Income" | "Expenses" | "Bank and Cash";
};
type AccountDetail = {
  accounts: Account[];
};

export default function Home() {
  const { api } = useAuth();
  const get_account = async () => {
    const response = await api.get("/accounts");
    return response.data;
  };
  const {
    data: account_detail,
    isLoading,
    error,
  } = useQuery<AccountDetail>({
    queryKey: ["accountdetail"],
    queryFn: get_account,
  });
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
          {account_detail?.accounts
            .filter((account) => account.account_type === "Bank and Cash")
            .map((account) => {
              return (
                <AccountCard
                  accountName={account.name}
                  money={account.balance}
                />
              );
            })}
          <AddAccountCard />
        </div>
        <Divider orientation="vertical" flexItem />

        <div className="flex flex-col flex-wrap gap-8">
          <text className="text-xl font-semibold text-white">
            Income Accounts
          </text>
          {account_detail?.accounts
            .filter((account) => account.account_type === "Income")
            .map((account) => {
              return (
                <AccountCard
                  accountName={account.name}
                  money={account.balance}
                />
              );
            })}
          <AddAccountCard />
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-col flex-wrap gap-8">
          <text className="text-xl font-semibold text-white ">
            Expense Accounts
          </text>
          {account_detail?.accounts
            .filter((account) => account.account_type === "Expenses")
            .map((account) => {
              return (
                <AccountCard
                  accountName={account.name}
                  money={account.balance}
                />
              );
            })}
          <AddAccountCard />
        </div>
      </div>
    </div>
  );
}
