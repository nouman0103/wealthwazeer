import { Add } from "@mui/icons-material";

interface loanType {
  loanName: string;
  money: number;
}

export const LoanCard = ({ loanName, money }: loanType) => {
  return (
    <div className="flex flex-col px-8 py-8 gap-4 w-56 bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic">
      <span className="text-xl text-white text-opacity-50 font-medium truncate">
        {loanName}
      </span>
      <div className="flex gap-3">
        <span className="text-sm font-semibold mt-3 text-white">RS</span>
        <span className="text-3xl font-semibold text-white font-lg">
          {money}
        </span>
      </div>
    </div>
  );
};

export const AddLoanCard = () => {
  return (
    <div className="flex flex-col flex-grow w-64 px-2 py-8 gap-4 mx-auto bg-glassmorphicPrimary rounded-3xl border-4 border-dashed border-white border-opacity-15 transition-all hover:bg-glassmorphic-gradient-hover scale-100 hover:scale-105 active:scale-100 active:bg-black active:bg-opacity-10">
      <text className="text-xl text-white text-opacity-50 text-center">
        Add Loan
      </text>
      <Add className="text-2xl text-white text-opacity-50 mx-auto" />
    </div>
  );
};
