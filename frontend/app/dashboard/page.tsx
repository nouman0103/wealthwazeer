import Image from "next/image";
import Drawer from "@/components/drawer";
import { Box, Typography, LinearProgress } from '@mui/material'

export default function Home() {
  const progress = 423;
  const goal =1000;
  return (
    <main className="min-h-screen bg-dark-bg-gr-to-purple flex">
      <Drawer />
      <div className="p-10">

        <div className="w-72 bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-8 flex flex-col gap-3">
          <text className="text-lg font-medium text-white text-opacity-70">
            Net Savings
          </text>

          <div className="mb-1">
            <text className="text-xl mr-3 text-white text-opacity-70">
              RS
            </text>
            <text className="text-4xl font-semibold">
              1,321
            </text>
          </div>

          <text className="text-goalYellow -mb-2">
            Saving Goals: 1,500
          </text>

          <div className="w-full h-3 bg-glassmorphic-gradient border border-opacity-5 border-white shadow-glassmorphic rounded-full">
            <div className="w-[38%] h-full bg-goalYellow shadow-innerShadow rounded-full" />
          </div>
        </div>



      </div>
    </main>
  );
}