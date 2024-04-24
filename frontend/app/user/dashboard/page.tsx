'use client'
import React from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import { IncomingIcon, OutgoingIcon } from '@/components/datagrid';
import { LineChart } from '@mui/x-charts/LineChart';
import Link from 'next/link';

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

const TransactionCards: React.FC<{ title: string, date: string, value: number, isArrowUp: boolean }> = ({ title, date, value, isArrowUp }) => {
  return (
    <div className='flex items-center px-2 py-1 lg:px-3 lg:py-2 bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border border-opacity-5 border-white'>
      {isArrowUp ? (
        <OutgoingIcon />
      ) : (
        <IncomingIcon />
      )}
      <div className='flex-grow flex flex-col gap-1 ml-4'>
        <text className='text-base xl:text-xl font-medium text-white self-start max-w-48 truncate'>
          {title}
        </text>
        <text className='text-xs xl:text-sm text-white text-opacity-70 self-start'>
          {date}
        </text>
      </div>
      <div className='flex ml-8'>
        <text className='text-xs xl:text-base mt-auto mb-1 text-white text-opacity-70 ml-3'>
          Rs
        </text>
        <text className='text-base xl:text-xl font-medium text-white  ml-1'>
          {value.toLocaleString()}
        </text>
      </div>
    </div>
  )
}

const GlassmorphicProgressBar: React.FC<{ progressTitle: string, progress: number, progressColor: string }> = ({ progressTitle, progress, progressColor }) => {
  const bgColorVariants: { [key: string]: string } = {
    goalYellow: 'bg-goalYellow',
    softPink: 'bg-softPink',
    red: 'bg-red-200',
  };
  const textColorVariants: { [key: string]: string } = {
    goalYellow: 'text-goalYellow',
    softPink: 'text-softPink',
    red: 'text-red-200',
  };
  return (
    <>
      <text className={`${textColorVariants[progressColor]} text-xs sm:text-sm xl:text-base -mb-2`}>
        {progressTitle}
      </text>

      <div className="w-full h-3 bg-glassmorphic-gradient border border-opacity-5 border-white shadow-glassmorphic rounded-full">
        <div style={
          {
            width: `${progress}%`,
          }
        } className={`h-full ${bgColorVariants[progressColor]} shadow-innerShadow rounded-full`} />
      </div>
    </>
  )
}

const DashCard: React.FC<{ title: string, value: number, bars: { title: string, value: number, color: string }[], }> = ({ title, value, bars }) => {


  const [showAll, setShowAll] = React.useState(false);


  return (
    <div
      className="relative h-48 w-60"
      onMouseEnter={() => setShowAll(true)}
      onMouseLeave={() => setShowAll(false)}
    >
      <div
        className={`absolute transition-all z-0 hover:z-10 duration-500 w-60 h-min bg-glassmorphic-gradient hover:bg-glassmorphic-gradient-hover scale-100 hover:scale-105 backdrop-blur-lg shadow-glassmorphic hover:glassmorphic-hover rounded-3xl border border-opacity-5 border-white p-6 flex flex-col gap-3`}
      >
        <text className="text-base xl:text-lg font-medium text-white text-opacity-70">
          {title}
        </text>

        <div className="mb-1">
          <text className="text-xs xl:text-xl mr-3 text-white text-opacity-70">
            RS
          </text>
          <text className="text-xl xl:text-3xl font-semibold">
            {value.toLocaleString()}
          </text>
        </div>

        <GlassmorphicProgressBar progressTitle={bars[0].title} progress={bars[0].value} progressColor={bars[0].color} />
        <div className={`flex flex-col gap-3 transition-all duration-300 ${showAll ? 'max-h-56 scale-y-100' : 'scale-y-0 max-h-0'} overflow-hidden`}>
          {bars.slice(1).map((bar, index) => (
            <GlassmorphicProgressBar key={index} progressTitle={bar.title} progress={bar.value} progressColor={bar.color} />
          ))}
        </div>

      </div >
    </div>
  )

}


export default function Home() {

  const customize = {
    height: 380,
    stackingOrder: 'descending',
    margin: { bottom: 100 },
  };
  return (
    <div className="p-2 lg:p-4 2xl:p-8 overflow-x-hidden flex gap-2 lg:gap-4 2xl:gap-8 flex-wrap flex-grow">
      <div className='flex flex-col gap-2 lg:gap-4 2xl:gap-8 flex-wrap'>
        <div className='flex gap-2 lg:gap-4 2xl:gap-8 flex-wrap'>
          <DashCard title='Net Savings' value={423} bars={[{ title: 'Saving Goals: 1,500', value: 65, color: 'goalYellow' }, { title: 'Investments: 500', value: 65, color: 'softPink' }, { title: 'Emergency Fund: 500', value: 65, color: 'red' }]} />
          <DashCard title='Income' value={15000} bars={[{ title: '65% Salary', value: 65, color: 'softPink' }]} />
          <DashCard title='Total Spent' value={14642} bars={[{ title: '85% Groceries', value: 85, color: 'red' }]} />
        </div>
        <div className='bg-glassmorphic-gradient backdrop backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col gap-2 xl:gap-3'>
          <text className='ml-2 text-base xl:text-lg font-medium text-white text-opacity-70'>
            Reports
          </text>
          <div className='flex flex-col gap-4'>
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
                  }
                }
              }}
              tooltip={{
                classes: {
                  root: "bg-transparent bg-glassmorphic-gradient backdrop backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col gap-2 xl:gap-3",
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

      <div className='bg-glassmorphic-gradient backdrop backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col flex-grow gap-2 xl:gap-3'>
        <div className='flex justify-between'>
          <text className='ml-2 text-base xl:text-lg font-medium text-white text-opacity-70'>
            Transactions
          </text>
          <Link href={'./transactions'}>
            <text className='mr-2 text-xs my-auto font-medium text-primaryPink scale-100 hover:scale-105 active:scale-95 transition-all '>
              See all
            </text>
          </Link>
        </div>
        <div className='flex flex-col gap-4'>
          <TransactionCards title='Spotify Premium' date='11:00 am, 15/04' value={400} isArrowUp={true} />
          <TransactionCards title='Youtube Premium' date='11:00 am, 15/04' value={320} isArrowUp={true} />
          <TransactionCards title='Amazon.com Order' date='11:00 am, 15/04' value={1200} isArrowUp={true} />
          <TransactionCards title='Payoneer' date='11:00 am, 15/04' value={32000} isArrowUp={false} />
        </div>
      </div>
    </div>
  );
}