import { Add } from "@mui/icons-material";
import React from "react";

interface loanType {
  loanName: string;
  money: number;
}

export const SavingsCard = ({ loanName, money }: loanType) => {
  return (
    <div className="flex flex-col px-8 py-8 gap-4 w-72 bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic">
      <span className="text-xl text-white text-opacity-50 font-medium truncate">
        {loanName}
      </span>
      <div className="mb-1">
        <text className="text-xs xl:text-xl mr-3 text-white text-opacity-70">RS</text>
        <text className="text-xl xl:text-3xl ">
          {money}
        </text>
      </div>
    </div>
  );
};

interface AddSavingsCardProps {
  onClick: () => void;
}

export const  AddSavingsCard: React.FC<AddSavingsCardProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col flex-grow w-64 px-2 py-8 gap-4 mx-auto bg-glassmorphicPrimary rounded-3xl border-4 border-dashed border-white border-opacity-15 transition-all hover:bg-glassmorphic-gradient-hover scale-100 hover:scale-105 active:scale-100 active:bg-black active:bg-opacity-10 cursor-pointer"
      onClick={onClick}
    >
      <text className="text-xl text-white text-opacity-50 text-center">
        Add a Saving
      </text>
      <Add className="text-2xl text-white text-opacity-50 mx-auto" />
    </div>
  );
};

export const GlassmorphicProgressBar: React.FC<{ progressTitle: string, progress: number, progressColor: string }> = ({ progressTitle, progress, progressColor }) => {
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


export const SavingsBarCard: React.FC<{
    title: string,
    value: number,
    value2: number,
    bars: { title: string, value: number, color: string }[]
}> = ({ title, value, value2, bars }) => {
    return (
        <div
          className="w-72 h-min bg-glassmorphic-gradient backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-6 flex flex-col gap-3"
        >
          <text className="text-xl text-white text-opacity-50 font-medium truncate">
            {title}
          </text>
          
          <div className="mb-1">
            <text className="text-xs xl:text-xl mr-3 text-white text-opacity-70">
              RS
            </text>
            <text className="text-xl xl:text-3xl">
              {value.toLocaleString()} / {value2.toLocaleString()}
            </text>
          </div>

          <GlassmorphicProgressBar progressTitle={bars[0].title} progress={bars[0].value} progressColor={bars[0].color} />
        </div>
    );
}

export const  SetGoalCard: React.FC<AddSavingsCardProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col flex-grow w-64 px-2 py-8 gap-4 mx-auto bg-glassmorphicPrimary rounded-3xl border-4 border-dashed border-white border-opacity-15 transition-all hover:bg-glassmorphic-gradient-hover scale-100 hover:scale-105 active:scale-100 active:bg-black active:bg-opacity-10 cursor-pointer"
      onClick={onClick}
    >
      <text className="text-xl text-white text-opacity-50 text-center">
        Set a Goal
      </text>
      <Add className="text-2xl text-white text-opacity-50 mx-auto" />
    </div>
  );
};
