"use client";
import React , { useState }from "react";
import { SavingsCard, AddSavingsCard, SavingsBarCard, SetGoalCard } from "./savingCards";
import { LineChart } from '@mui/x-charts/LineChart';
import { AddSavingPopup } from "./AddSavingPopup";
import { AddGoalPopup } from "./AddGoalPopup";

const years = [
    new Date(2024, 4, 10),
    new Date(2024, 4, 11),
    new Date(2024, 4, 12),
    new Date(2024, 4, 13),
    new Date(2024, 4, 14),
    new Date(2024, 4, 15),
    new Date(2024, 4, 16),
    new Date(2024, 4, 17),
    new Date(2024, 4, 18),
];

const income = [
    1000,
    2000,
    1500,
    2500,
    3000,
    2000,
    1500,
    2500,
    3000,
];

const spent = [
    500,
    1000,
    800,
    1200,
    1500,
    1000,
    800,
    1200,
    1500,
];

export default function Home() {
  const [isAddSavingPopupOpen, setAddSavingPopupOpen] = useState(false);
  const [isAddGoalPopupOpen, setAddGoalPopupOpen] = useState(false);

  const handleAddSavingPopupOpen = () => {
      setAddSavingPopupOpen(true);
  };

  const handleAddSavingPopupClose = () => {
      setAddSavingPopupOpen(false);
  };
  
  const handleAddGoalPopupOpen = () => {
    setAddGoalPopupOpen(true);
  };

  const handleAddGoalPopupClose = () => {
    setAddGoalPopupOpen(false);
  };

  const [goalExists, setGoalExists] = useState(false);

    const handleToggleGoal = () => {
        setGoalExists(!goalExists); 
    };
    const customize = {
        height: 300,
        stackingOrder: 'descending',
        margin: { bottom: 100 },
    };

    return (
        <>
            <div className="p-8 flex flex-col gap-2 lg:gap-4 2xl:gap-8 flex-grow overflow-hidden">
                <span className="text-2xl font-semibold text-white text-opacity-80">
                    Savings
                </span>
                <div className="flex gap-2 lg:gap-4 2xl:gap-8 flex-wrap">
                    <SavingsCard key="totalSavings" loanName="Total Savings" money={3210} />
                    <SavingsCard key="savingsThisWeek" loanName="Savings this week" money={425} />
                    <SavingsCard key="savingsThisMonth" loanName="Savings this month" money={1550} />
                    <AddSavingsCard onClick={handleAddSavingPopupOpen} />
                </div>

                <div className="flex gap-2 lg:gap-4 2xl:gap-8">
                    <div className="flex flex-col gap-4">
                        {goalExists ? (
                            <SavingsBarCard title='New Phone' value={3190} value2={90000} bars={[{ title: '35%', value: 35, color: 'goalYellow' }]} />
                        ) : (
                            <SetGoalCard onClick={handleAddGoalPopupOpen}  />
                        )}
                    </div>

                    <div className='bg-glassmorphic-gradient shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col xl:gap-3 flex-grow gap-4'>
                        <text className='ml-2 text-base xl:text-lg font-medium text-white text-opacity-70'>
                            Gross Savings
                        </text>
                        <div className='flex flex-col gap-4'>
                            <LineChart
                                sx={{
                                    '& .MuiAreaElement-series-savings': {
                                        fill: 'url(#savingsGradient)',
                                    },
                                }}
                                xAxis={[
                                    { id: 'Date', data: years, scaleType: 'time', valueFormatter: (date) => date.toLocaleDateString() }
                                ]}
                                series={[
                                    {
                                        id: 'savings',
                                        data: income.map((incomeValue, index) => incomeValue - spent[index]), // Calculate savings by subtracting spent from income
                                        label: "Savings",
                                        color: "#FFD966", // Use a hexadecimal value for better control over the color
                                        area: true,
                                    },
                                ]}
                                slotProps={{
                                    legend: {
                                        position: { vertical: "bottom", horizontal: "middle" },
                                        labelStyle: {
                                            fontSize: 16,
                                            fill: 'rgba(255,255,255,60%)',
                                        },
                                        padding: {
                                            top: 50,
                                            bottom: 10,
                                            left: 0,
                                            right: 0,
                                        },
                                        classes: {
                                            'mark': "stroke-grey-900 opacity-50",
                                            'series': "",
                                            'root': "",
                                        },
                                    }
                                }}
                                tooltip={{
                                    classes: {
                                        root: "bg-yellow-500 backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col gap-2 xl:gap-3",
                                    },
                                }}
                                {...customize}
                            >
                                <defs>
                                    <linearGradient id="savingsGradient" gradientTransform="rotate(90)">
                                        <stop offset="5%" stopColor="rgba(255 255 11 / 18%)" />
                                        <stop offset="95%" stopColor="rgb(255 255 11 / 0%)" />
                                        {/*<stop offset="5%" stopColor="#FFD966" stopOpacity="0.9" />*/}
                                        {/*<stop offset="95%" stopColor="#FFD966"  stopOpacity="0.1"/>*/}
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>
            <AddSavingPopup open={isAddSavingPopupOpen} handleClose={handleAddSavingPopupClose} />
            <AddGoalPopup open={isAddGoalPopupOpen} handleClose={handleAddGoalPopupClose} />
        </>
    );
}
