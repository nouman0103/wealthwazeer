import React from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';

import { IncomingIcon, OutgoingIcon } from '@/components/datagrid';

const TransactionCards: React.FC<{ title: string, date: string, value: number, isArrowUp: boolean }> = ({ title, date, value, isArrowUp }) => {
  return (
    <div className='flex items-center px-3 py-2 bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-xl border border-opacity-5 border-white'>
      {isArrowUp ? (
        <OutgoingIcon/>
      ) : (
        <IncomingIcon/>
      )}
      <div className='flex-grow flex flex-col gap-1 ml-4'>
        <text className='text-xl font-medium text-white self-start max-w-48 truncate'>
          {title}
        </text>
        <text className='text-sm text-white text-opacity-70 self-start'>
          {date}
        </text>
      </div>
      <div className='flex ml-8'>
        <text className='text-md mt-auto mb-1 text-white text-opacity-70 ml-3'>
          Rs
        </text>
        <text className='text-xl font-medium text-white  ml-1'>
          {value.toLocaleString()}
        </text>
      </div>
    </div>
  )
}

const DashCard: React.FC<{ title: string, value: string }> = ({ title, value }) => {
  return (
    <div className="w-72 h-min bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-8 flex flex-col gap-3">
      <text className="text-lg font-medium text-white text-opacity-70">
        {title}
      </text>

      <div className="mb-1">
        <text className="text-xl mr-3 text-white text-opacity-70">
          RS
        </text>
        <text className="text-4xl font-semibold">
          {value}
        </text>
      </div>

      <text className="text-goalYellow -mb-2">
        Saving Goals: 1,500
      </text>

      <div className="w-full h-3 bg-glassmorphic-gradient border border-opacity-5 border-white shadow-glassmorphic rounded-full">
        <div className="w-[38%] h-full bg-goalYellow shadow-innerShadow rounded-full" />
      </div>
    </div>
  )

}


export default function Home() {
  const progress = 423;
  const goal = 1000;
  return (
    <div className="p-10">
      <div className='flex gap-10'>

        <DashCard title='Total Spent' value='3455' />

        <div className='bg-glassmorphic-gradient backdrop backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-4 flex flex-col gap-3'>
          <div className='flex justify-between'>
            <text className='text-lg font-medium text-white text-opacity-70'>
              Transactions
            </text>
            <text className='text-xs my-auto font-medium text-primaryPink'>
              See all
            </text>
          </div>
          <div className='flex flex-col gap-4'>
            <TransactionCards title='Spotify Premium' date='11:00 am, 15/04' value={400} isArrowUp={true} />
            <TransactionCards title='Youtube Premium' date='11:00 am, 15/04' value={320} isArrowUp={true} />
            <TransactionCards title='Amazon.com Order' date='11:00 am, 15/04' value={1200} isArrowUp={true} />
            <TransactionCards title='Payoneer' date='11:00 am, 15/04' value={32000} isArrowUp={false} />
          </div>
        </div>
      </div>
    </div>
  );
}