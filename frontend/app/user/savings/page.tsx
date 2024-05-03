"use client"
import React from "react";
import { SavingsCard, AddSavingsCard, SavingsBarCard } from "./savingCards";
import { LineChart } from '@mui/x-charts/LineChart';

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
    const customize = {
        height: 380,
        stackingOrder: 'descending',
        margin: { bottom: 100 },
      };
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
        <div className ="flex ">
            <div className = "flex flex-col gap-4">
            <SavingsBarCard title='New Phone' value={3190}value2={90000} bars={[{ title: '35%', value: 35, color: 'goalYellow' }]} />
            <SavingsBarCard title='New Phone' value={3190}value2={90000} bars={[{ title: '35%', value: 35, color: 'goalYellow' }]} />
            </div>

            <div className='flex-grow'>
            <LineChart
              sx={{
                '& .MuiAreaElement-series-income': {
                  fill: 'url(#incomeGradient)',
                },
                '& .MuiAreaElement-series-spent': {
                  fill: 'url(#spentGradient)',
                },
              }}
              xAxis={[
                { id: 'Date', data: years, scaleType: 'time', valueFormatter: (date) => date.toLocaleDateString() }
              ]}
              series={[
                {
                  id: 'spent',
                  data: spent,
                  label: "Spent",
                  color: "red",
                  area: true,
                },
                {
                  id: 'income',
                  data: income,
                  label: "Income",
                  color: "green",
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
                    'series': "", // Add the missing 'series' property
                    'root': "", // Add the missing 'root' property
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
                <linearGradient id="incomeGradient" gradientTransform="rotate(90)">
                  <stop offset="5%" stopColor="rgba(11 255 82 / 18%)" />
                  <stop offset="95%" stopColor="rgb(11 255 82 / 0%)" />
                </linearGradient>
                <linearGradient id="spentGradient" gradientTransform="rotate(90)">
                  <stop offset="5%" stopColor="rgba(255 11 11 / 18%)" />
                  <stop offset="95%" stopColor="rgb(255 11 11 / 0%)" />
                </linearGradient>
              </defs>
            </LineChart>
          </div>
          </div>
        </div>
      </>
    );
  }