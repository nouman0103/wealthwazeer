"use client";
import React, { useMemo } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

import { IncomingIcon, OutgoingIcon } from "@/components/datagrid";
import { LineChart } from "@mui/x-charts/LineChart";
import Link from "next/link";
import { spopper } from "@/components/datagrid";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContex";
import { Account } from "../accounts/page";
import { TransactionList } from "../transactions/page";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Fade, Slide } from "@mui/material";
import Add from "@mui/icons-material/Add";
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { AddGoalPopup } from "./AddGoalPopup";
import { AddSavingPopup } from "./AddSavingPopup";
import { GlassmorphicButton } from "@/components/buttons";

type GraphData = {
  income: number[];
  expenses: number[];
  dates: string[];
};

const TransactionCards: React.FC<{
  title: string;
  date: string;
  value: number;
  isArrowUp: boolean;
}> = ({ title, date, value, isArrowUp }) => {
  return (
    <div className="flex items-center px-2 py-1 lg:px-3 lg:py-2 bg-glassmorphic-gradient shadow-glassmorphic rounded-xl border border-opacity-5 border-white">
      {isArrowUp ? <OutgoingIcon /> : <IncomingIcon />}
      <div className="flex-grow flex flex-col gap-1 ml-4">
        <span className="text-base xl:text-xl font-medium text-white self-start max-w-48 truncate">
          {title}
        </span>
        <span className="text-xs xl:text-sm text-white text-opacity-70 self-start">
          {date}
        </span>
      </div>
      <div className="flex ml-8">
        <span className="text-xs xl:text-base mt-auto mb-1 text-white text-opacity-70 ml-3">
          Rs
        </span>
        <span className="text-base xl:text-xl font-medium text-white  ml-1">
          {value.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const GlassmorphicProgressBar: React.FC<{
  progressTitle: string;
  progress: number;
  progressColor: string;
}> = ({ progressTitle, progress, progressColor }) => {
  const bgColorVariants: { [key: string]: string } = {
    goalYellow: "bg-goalYellow",
    softPink: "bg-softPink",
    red: "bg-red-200",
  };
  const textColorVariants: { [key: string]: string } = {
    goalYellow: "text-goalYellow",
    softPink: "text-softPink",
    red: "text-red-200",
  };
  return (
    <>
      <span
        className={`${textColorVariants[progressColor]} text-xs sm:text-sm xl:text-base -mb-2`}
      >
        {progressTitle}
      </span>

      <div className="w-full h-3 bg-glassmorphic-gradient border border-opacity-5 border-white shadow-glassmorphic rounded-full">
        <div
          style={{
            width: `${progress}%`,
          }}
          className={`h-full ${bgColorVariants[progressColor]} shadow-innerShadow rounded-full`}
        />
      </div>
    </>
  );
};

const DashCard: React.FC<{
  title: string;
  value: number;
  bars: { title: string; value: number; color: string }[];
}> = ({ title, value, bars }) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <div
      className="relative h-48 min-w-60"
      onMouseEnter={() => setShowAll(true)}
      onMouseLeave={() => setShowAll(false)}
    >
      <div
        className={`absolute transition-all z-0 hover:z-10 duration-500 min-w-60 h-min bg-glassmorphic-gradient hover:bg-purple-700 hover:bg-opacity-5 scale-100 hover:scale-105 backdrop-blur-lg shadow-glassmorphic hover:glassmorphic-hover rounded-3xl border border-opacity-5 border-white p-6 flex flex-col gap-3`}
      >
        <span className="text-base xl:text-lg font-medium text-white text-opacity-70">
          {title}
        </span>

        <div className="mb-1">
          <span className="text-xs xl:text-xl mr-3 text-white text-opacity-70">
            RS
          </span>
          <span className="text-xl xl:text-3xl font-semibold">
            {value.toLocaleString()}
          </span>
        </div>
        {bars.length > 0 && (
          <GlassmorphicProgressBar
            progressTitle={bars[0].title}
            progress={bars[0].value}
            progressColor={bars[0].color}
          />
        )}
        <div
          className={`flex flex-col gap-3 transition-all duration-300 ${showAll ? "max-h-56 scale-y-100" : "scale-y-0 max-h-0"
            } overflow-hidden`}
        >
          {bars.slice(1).map((bar, index) => (
            <GlassmorphicProgressBar
              key={index}
              progressTitle={bar.title}
              progress={bar.value}
              progressColor={bar.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


const SavingsCard: React.FC<{
  savedAmount?: number;
  targetAmount?: number;
  goalExists?: boolean;
  handleAddGoalPopupOpen?: () => void;
  handleAddSavingPopupOpen?: () => void;
}> = ({ savedAmount, targetAmount, goalExists, handleAddGoalPopupOpen, handleAddSavingPopupOpen }) => {

  return (!goalExists) ? (
    <div
      className={`h-44 lg:h-48 transition-all z-0 hover:z-10 w-60 bg-glassmorphicPrimary hover:bg-glassmorphic-gradient-hover active:bg-black active:bg-opacity-20 rounded-3xl border-4 border-dashed scale-100 hover:scale-105 active:scale-100 backdrop-blur-lg shadow-glassmorphic hover:glassmorphic-hover border-opacity-5 border-white p-6 flex flex-col gap-3`}
      onClick={handleAddGoalPopupOpen}
    >
      <span className="mt-auto text-xl text-white text-opacity-50 text-center">
        Create a goal
      </span>
      <Add className="mb-auto text-2xl text-white text-opacity-50 mx-auto" />
    </div>
  ) : (
    <div
      className={`h-44 lg:h-48 transition-all z-0 hover:z-10 duration-500 min-w-60 w-auto bg-glassmorphic-gradient hover:bg-purple-700 hover:bg-opacity-5 scale-100 hover:scale-105 backdrop-blur-lg shadow-glassmorphic hover:glassmorphic-hover rounded-3xl border border-opacity-5 border-white p-6 flex flex-col gap-3`}
    >
      <div className="flex">
        <span className="text-base xl:text-lg font-medium text-white text-opacity-70">
          Saving Goal
        </span>
        <div className="transition-all ml-auto p-1 bg-glassmorphic-gradient rounded-md shadow-glassmorphic border border-opacity-5 border-white scale-100 hover:scale-105 active:scale-100 hover:bg-glassmorphic-gradient-hover" onClick={handleAddSavingPopupOpen}>
          <PriceChangeOutlinedIcon className="text-white text-opacity-50 " fontSize="small" />
        </div>
      </div>

      <div className="mb-1">
        <span className="text-xs xl:text-xl mr-3 text-white text-opacity-70">
          RS
        </span>
        <span className="text-xl xl:text-2xl font-semibold">
          {savedAmount?.toLocaleString()} / {targetAmount?.toLocaleString()}
        </span>
      </div>
      <GlassmorphicProgressBar
        progressTitle={"New Phone"}
        progress={67}
        progressColor={"goalYellow"}
      />
    </div>
  )
};

type DashCard_Data = {
  income_accounts: Account[];
  expense_accounts: Account[];
  bank_accounts: Account[];
};
const color = ["goalYellow", "softPink", "red"];
const getRandomColor = () => {
  return color[Math.floor(Math.random() * color.length)];
};
export default function Home() {
  const customize = {
    height: 380,
    stackingOrder: "descending",
    margin: { bottom: 100 },
  };
  const { api } = useAuth();
  const get_card_data = async () => {
    const response = await api.get("/accounts/dashboard");
    return response.data;
  };
  const { data, isLoading } = useQuery<DashCard_Data>({
    queryKey: ["dashboard_cards"],
    queryFn: get_card_data,
  });
  const net_sum = useMemo(() => {
    return (
      data?.bank_accounts.reduce((a, b) => {
        return a + b.balance;
      }, 0) ?? 0
    );
  }, [data]);
  const income_sum = useMemo(() => {
    return data?.income_accounts.reduce((a, b) => a + b.balance, 0) ?? 0;
  }, [data]);
  const expense_sum = useMemo(
    () => data?.expense_accounts.reduce((a, b) => a + b.balance, 0) ?? 0,
    [data]
  );
  const getGraphData = async () => {
    const response = await api.get("/accounts/monthreport");
    return response.data;
  };
  const { data: graph, isLoading: graphLoading } = useQuery<GraphData>({
    queryKey: ["dashboard_graph"],
    queryFn: getGraphData,
  });
  const dates_array = useMemo(
    () => graph?.dates.map((value) => new Date(value)) ?? [],
    [graph?.dates]
  );

  const getTransactions = async () => {
    const response = await api.get<TransactionList>("/transactions", {
      params: {
        limit: 10,
        page: 0,
      },
    });
    return response.data;
  };

  const {
    data: Transaction,
    isLoading: TransactionLoading,
    isError,
  } = useQuery<TransactionList>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: tipOfTheDay, isLoading: tipOfTheDayLoading } = useQuery({
    queryKey: ["tipOfTheDay"],
    queryFn: async () => {
      const response = await api.get("/ai");
      return response.data;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchInterval: 30 * 60 * 10000,
    refetchIntervalInBackground: false,
  });

  const [tipOfTheDayOpen, setTipOfTheDayOpen] = React.useState(true);
  const [isAddGoalPopupOpen, setAddGoalPopupOpen] = React.useState(false);
  const handleAddGoalPopupOpen = () => {
    setAddGoalPopupOpen(true);
  };

  const handleAddGoalPopupClose = () => {
    setAddGoalPopupOpen(false);
  };

  const [isAddSavingPopupOpen, setAddSavingPopupOpen] = React.useState(false);
  const handleAddSavingPopupOpen = () => {
    setAddSavingPopupOpen(true);
  };

  const handleAddSavingPopupClose = () => {
    setAddSavingPopupOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setTipOfTheDayOpen(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="p-2 lg:p-4 2xl:p-8 overflow-x-hidden flex gap-2 lg:gap-4 2xl:gap-8 flex-wrap flex-grow">
      <div className="flex flex-col gap-2 lg:gap-4 2xl:gap-8 flex-wrap w-full">
        <div className="flex-grow flex flex-wrap gap-2 lg:gap-4 2xl:gap-8">
          <DashCard
            title="Net Savings"
            value={net_sum}
            bars={[
              ...(data?.bank_accounts
                .sort((a, b) => a.balance - b.balance)
                .reverse()
                .map((account, index) => {
                  return {
                    title: account.name,
                    value: Math.round((account.balance / net_sum) * 100),
                    color: getRandomColor(),
                  };
                }) ?? []),
            ]}
          />
          <DashCard
            title="Income"
            value={income_sum}
            bars={[
              ...(data?.income_accounts
                .sort((a, b) => a.balance - b.balance)
                .reverse()
                .map((account, index) => {
                  return {
                    title: account.name,
                    value: Math.round((account.balance / income_sum) * 100),
                    color: getRandomColor(),
                  };
                }) ?? []),
            ]}
          />
          <DashCard
            title="Total Spent"
            value={expense_sum}
            bars={[
              ...(data?.expense_accounts
                .sort((a, b) => a.balance - b.balance)
                .reverse()
                .map((account, index) => {
                  return {
                    title: account.name,
                    value: Math.round((account.balance / expense_sum) * 100),
                    color: getRandomColor(),
                  };
                }) ?? []),
            ]}
          />
          <div className="flex flex-col gap-4 py-3">
            <Link href={"./transactions"} className="text-center cursor-pointer transition-all bg-glassmorphic-gradient border border-white border-opacity-5 shadow-glassmorphic p-6 rounded-xl hover:bg-glassmorphic-gradient-hover scale-100 active:scale-95">
              Manage Transactions
            </Link>
            <Link href={"./loans"}  className="text-center cursor-pointer transition-all bg-glassmorphic-gradient border border-white border-opacity-5 shadow-glassmorphic p-6 rounded-xl hover:bg-glassmorphic-gradient-hover scale-100 active:scale-95">
              Manage Loans
            </Link>
          </div>
          {/* <SavingsCard
            savedAmount={3190}
            targetAmount={90000}
            goalExists={true}
            handleAddGoalPopupOpen={handleAddGoalPopupOpen}
            handleAddSavingPopupOpen={handleAddSavingPopupOpen}
          /> */}
        </div>
        <div className="bg-glassmorphic-gradient shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col gap-2 xl:gap-3">
          <p className="ml-2 text-base xl:text-lg font-medium text-white text-opacity-70">
            Reports
          </p>
          <div className="flex flex-col gap-4">
            <LineChart
              sx={{
                "& .MuiAreaElement-series-income": {
                  fill: "url(#incomeGradient)",
                },
                "& .MuiAreaElement-series-spent": {
                  fill: "url(#spentGradient)",
                },
              }}
              xAxis={[
                {
                  id: "Date",
                  data: dates_array,
                  scaleType: "time",
                  valueFormatter: (date) => date.toLocaleDateString(),
                },
              ]}
              series={[
                {
                  id: "spent",
                  data: graph?.expenses ?? [],
                  label: "Spent",
                  color: "red",
                  area: true,
                },
                {
                  id: "income",
                  data: graph?.income ?? [],
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
                    fill: "rgba(255,255,255,60%)",
                  },
                  padding: {
                    top: 50,
                    bottom: 10,
                    left: 0,
                    right: 0,
                  },

                  classes: {
                    mark: "stroke-grey-900 opacity-50",
                    series: "", // Add the missing 'series' property
                    root: "", // Add the missing 'root' property
                  },
                },
              }}
              tooltip={{
                classes: {
                  root: "bg-yellow-500 backdrop-blur-lg shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col gap-2 xl:gap-3",
                },
              }}
              {...customize}
            >
              <defs>
                <linearGradient
                  id="incomeGradient"
                  gradientTransform="rotate(90)"
                >
                  <stop offset="5%" stopColor="rgba(11 255 82 / 18%)" />
                  <stop offset="95%" stopColor="rgb(11 255 82 / 0%)" />
                </linearGradient>
                <linearGradient
                  id="spentGradient"
                  gradientTransform="rotate(90)"
                >
                  <stop offset="5%" stopColor="rgba(255 11 11 / 18%)" />
                  <stop offset="95%" stopColor="rgb(255 11 11 / 0%)" />
                </linearGradient>
              </defs>
            </LineChart>
          </div>
        </div>

        <div className="bg-glassmorphic-gradient shadow-glassmorphic rounded-3xl border border-opacity-5 border-white p-2 xl:p-4 flex flex-col flex-grow gap-2 xl:gap-3">
          <div className="flex justify-between">
            <p className="ml-2 text-base xl:text-lg font-medium text-white text-opacity-70">
              Transactions
            </p>
            <Link href={"./transactions"}>
              <p className="mr-2 text-xs my-auto font-medium text-primaryPink scale-100 hover:scale-105 active:scale-95 transition-all ">
                See all
              </p>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {Transaction && Transaction.transactions.length > 0 ? (
              Transaction?.transactions.map((transaction, index) => (
                <TransactionCards
                  key={index}
                  title={transaction.description}
                  date={new Date(transaction.date).toLocaleString()}
                  value={transaction.amount}
                  isArrowUp={transaction.type === "expense" ? true : false}
                />
              ))
            ) : (
              <div className="text-center text-white text-opacity-70 mt-4">
                No Transactions
              </div>
            )}
          </div>
        </div>
      </div>
      {!tipOfTheDayLoading && (
        <Snackbar
          open={tipOfTheDayOpen}
          onClose={() => setTipOfTheDayOpen(false)}
          message={tipOfTheDay}
          action={action}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          TransitionComponent={Slide}
          sx={{
            "& .MuiSnackbarContent-root": {
              background: "linear-gradient(to right, #4568dc3d, #b06ab3b0)",
              color: "white",
              borderRadius: "18px",
              maxWidth: "80%",
              boxShadow: "0 0 20px rgb(78 17 138 / 30%)",
              backdropFilter: "blur(10px)",
            },
          }}
        />
      )}
      <AddSavingPopup open={isAddSavingPopupOpen} handleClose={handleAddSavingPopupClose} />
      <AddGoalPopup open={isAddGoalPopupOpen} handleClose={handleAddGoalPopupClose} />
    </div>
  );
}
