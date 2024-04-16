import React from 'react';

const DashCard: React.FC<{ title: string, value: string }> = ({ title, value }) => {
  return (
    <div className="w-72 bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-8 flex flex-col gap-3">
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
        <DashCard title='Net Savings' value='3455'/>
        <DashCard title='Income' value='3455'/>
        <DashCard title='Total Spent' value='3455'/>
        <div className='bg-blue-600 w-10 h-10'>
          <text>
            this is a test
          </text>
        </div>
      </div>




    </div>
  );
}