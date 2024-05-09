import { GlassmorphicDialog } from "@/components/dialogs";
import { SelectField } from "@/components/selectfield";
import { useAuth } from "@/context/AuthContex";
import { handleError } from "@/utls/handleError";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { Account } from "../accounts/page";
type LoanPayment = {
  amount: number;
  date: string;
  bank_account_id: string;
  loan_id: string;
  payment_type: "pay" | "receive";
};

export const CreatePaymentDialog = ({
  open,
  handleClose,
  type,
  loan_id,
}: {
  open: boolean;
  handleClose: () => void;
  type: string;
  loan_id: string;
}) => {
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const { api } = useAuth();

  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const get_bank_account = async () => {
    const response = await api.get("/accounts/bank");
    return response.data;
  };
  const { data: bank_accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["bank_account"],
    queryFn: get_bank_account,
  });
  const mutation = useMutation({
    mutationFn: async (loan: LoanPayment) => {
      const response = await api.post("/transactions/loan/payments", loan);
      return response.data;
    },
    onError: (error: AxiosError) => {
      handleError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loans","loansReport"],
      
      });
      handleClose();
    },
  });
  return (
    <GlassmorphicDialog open={open} onClose={handleClose}>
      <DialogTitle>Create loan payment</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "25rem",
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Typography>Payment to: Alice</Typography>
        <TextField
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
          type="number"
        />
        <SelectField
          label="Bank Account"
          value={bankAccount}
          valuefield="account_id"
          labelfield="name"
          onChange={setBankAccount}
          options={bank_accounts ?? []}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            className=" w-full"
            value={selectedDate}
            onAccept={(date) => setSelectedDate(date)}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            mutation.mutate({
              amount: Number(amount),
              bank_account_id: bankAccount,
              loan_id: loan_id,
              date: selectedDate?.toISOString() ?? new Date().toISOString(),
              payment_type: type === "payable" ? "pay" : "receive",
            });
          }}
        >
          Create Payment
        </Button>
      </DialogActions>
    </GlassmorphicDialog>
  );
};
