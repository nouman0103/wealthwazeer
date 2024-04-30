import React from "react";
import { LoanCard, AddLoanCard } from "./loanCards";

export default function Home() {
  return (
    <>
      <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
        <span className="text-2xl font-semibold text-white text-opacity-80">
          Loans
        </span>

        <div className="flex gap-8">
          <LoanCard loanName="Home Loan" money={100000} />
          <LoanCard loanName="Car Loan" money={50000} />
          <LoanCard loanName="Personal Loan" money={10000} />
          <AddLoanCard />
        </div>
      </div>
    </>
  );
}
