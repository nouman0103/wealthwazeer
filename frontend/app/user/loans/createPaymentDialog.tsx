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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useState } from "react";

export const CreatePaymentDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [expenseAccount, setExpenseAccount] = useState("");
  const { api } = useAuth();
  //   const add_contact = async () => {
  //     const response = await api.post("/partners", {
  //       name: name,
  //       email: email ?? undefined,
  //       phone: phone ?? undefined,
  //       city: city ?? undefined,
  //     });
  //     return response.data;
  //   };
  const queryClient = useQueryClient();

  //   const mutation = useMutation({
  //     mutationFn: add_contact,
  //     mutationKey: ["add_contact"],
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["contacts"],
  //       });
  //       handleClose();
  //     },
  //     onError: (error: AxiosError) => {
  //       setError(handleError(error));
  //     },
  //   });
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
    null
  );
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
          type="number"
        />
        <SelectField
          label="Bank Account"
          value="Some Account"
          valuefield="account_id"
          labelfield="name"
          onChange={setExpenseAccount}
          options={["Some Account", "Another Account"]}
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
        <Button>Create Payment</Button>
      </DialogActions>
    </GlassmorphicDialog>
  );
};
