"use client"
import React from "react";
import { SavingsCard, AddSavingsCard, SavingsBarCard } from "./savingCards";

export default function Home() {
    return (
      <>
        <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
            <span className="text-2xl font-semibold text-white text-opacity-80">
                Savings
            </span>
  
            <div className="flex gap-8">
                <SavingsCard key="totalSavings" loanName="Total Savings" money={3210} />
                <SavingsCard key="savingsThisWeek" loanName="Savings this week" money={425} />
                <SavingsCard key="savingsThisMonth" loanName="Savings this month" money={1550} />
                <AddSavingsCard />
            </div>
  
            <div>
            <SavingsBarCard title='New Phone' value={3190}value2={90000} bars={[{ title: '35%', value: 35, color: 'goalYellow' }]} />
            </div>
            <div>
            <SavingsBarCard title='New Phone' value={3190}value2={90000} bars={[{ title: '35%', value: 35, color: 'goalYellow' }]} />
            </div>

            
        </div>
      </>
    );
  }