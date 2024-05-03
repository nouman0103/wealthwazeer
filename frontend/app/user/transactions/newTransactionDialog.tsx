import * as React from "react";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { GlassmorphicDialog, GradientDialog } from "@/components/dialogs";
import {
    Autocomplete,
  Dialog,
  FormControl,
  Grow,
  InputAdornment,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Zoom,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { GlassmorphicPaper } from "@/components/paper";
import { GradientButton } from "@/components/buttons";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SelectField } from "@/components/selectfield";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContex";
import { ContactInterface } from "../contacts/contactItems";
import { ContactData } from "../contacts/page";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />;
});

type Account = {
  name: string;
  account_type: string;
  account_id: string;
};
type ExpenseTransaction = {
  amount: number;
  date: string;
  description: string;
  partner_id: string;
  expense_account_id: string;
  payment_account_id: string;
};
type IncomeTransaction = {
  amount: number;
  date: string;
  description: string;
  partner_id: string;
  income_account_id: string;
  payment_account_id: string;
};

export const NewExpenseDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [bankaccount, setBankAccount] = React.useState("");
  const [expenseaccount, setExpenseAccount] = React.useState("");
  const [selectedContact, setSelectedContact] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null);
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [error, setError] = React.useState("");
  const {api} = useAuth();
  const get_bank_account = async () => {
    const response = await api.get("/accounts/bank");
    return response.data;
  };
  const get_expense_accounts = async () => {
    const response = await api.get("/accounts/expense");
    return response.data;
  }
  const get_contact = async () => {
    const response = await api.get("/partners",{
      params: {
        limit: 0,//limit to 0 to get all contacts
        page: 0,
      },
    
    });
    return response.data;
  }
  const { data:bank_accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["bank_account"],
    queryFn: get_bank_account,
  });
  const { data:expense_accounts } = useQuery<Account[]>({
    queryKey: ["expense_account"],
    queryFn: get_expense_accounts,
  });
  const { data:contacts } = useQuery<ContactData>({
    queryKey: ["contacts"],
    queryFn: get_contact,
  });
  const saveExpense = async (expense: ExpenseTransaction) => {
    const response = await api.post("/transactions/expense", expense);
    return response.data;
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveExpense,
    mutationKey: ["saveExpense"],
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    }
  });
  const handleSave = () => {
    if (mutation.isPending) {
      return;
    }
    if (amount === 0) {
      setError("Amount cannot be zero");
      return;
    }
    if (selectedContact === "") {
      setError("Select a contact");
      return;
    }
    if (selectedDate === null) {
      setError("Select a date");
      return;
    }
    if (bankaccount === "") {
      setError("Select a bank account");
      return;
    }
    if (expenseaccount === "") {
      setError("Select an expense account");
      return;
    }
    mutation.mutate({
      amount:amount,
      date: selectedDate.toISOString(),
      description:description,
      partner_id: selectedContact,
      expense_account_id: expenseaccount,
      payment_account_id: bankaccount,
    });
  }
  
  
  return (
    <>
      <GradientDialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        
        <GlassmorphicPaper>
          <Toolbar className="bg-transparent">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
              New Expense
            </Typography>
          </Toolbar>
        </GlassmorphicPaper>
        <List className="w-96" sx={{ marginX: "auto" }}>
          <ListItem>
            <TextField label="Amount" className="w-full" type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            error={error === "Amount cannot be zero"}
            helperText={error === "Amount cannot be zero" ? "Amount cannot be zero" : ""}

             />
          </ListItem>
          <ListItem>
            <TextField label="Description" className="w-full" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            error={error === "Description cannot be empty"}
            helperText={error === "Description cannot be empty" ? "Description cannot be empty" : ""}
            />
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <Autocomplete
              className="w-full"
              options={contacts?.partners??[]}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              onChange={(e, value) =>setSelectedContact(value?.id??'')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payee"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Time" className=" w-full" 
              value={selectedDate}
              onAccept={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <SelectField
              label="Bank Account"
              value={bankaccount}
              valuefield="account_id"
              labelfield="name"
              onChange={setBankAccount}
              options={bank_accounts}
            />
           
          </ListItem>
          <ListItem>
          <SelectField
              label="Expense Account"
              value={expenseaccount}
              valuefield="account_id"
              labelfield="name"
              onChange={setExpenseAccount}
              options={expense_accounts}
            />
          </ListItem>

          <div className="h-3" />
          <ListItem>
            <GradientButton onClick={handleSave} className="normal-case font-bold text-2xl w-full">
              Add Expense
            </GradientButton>
          </ListItem>
        </List>
      </GradientDialog>
    </>
  );
};

export const NewIncomeDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [bankaccount, setBankAccount] = React.useState("");
  const [incomeaccount, setIncomeAccount] = React.useState("");
  const [selectedContact, setSelectedContact] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null);
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [error, setError] = React.useState("");
  const {api} = useAuth();
  const get_bank_account = async () => {
    const response = await api.get("/accounts/bank");
    return response.data;
  };
  const get_income_accounts = async () => {
    const response = await api.get("/accounts/income");
    return response.data;
  }
  const get_contact = async () => {
    const response = await api.get("/partners",{
      params: {
        limit: 0,//limit to 0 to get all contacts
        page: 0,
      },
    
    });
    return response.data;
  }
  const { data:bank_accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["bank_account"],
    queryFn: get_bank_account,
  });
  const { data:income_accounts } = useQuery<Account[]>({
    queryKey: ["income_account"],
    queryFn: get_income_accounts,
  });
  const { data:contacts } = useQuery<ContactData>({
    queryKey: ["contacts"],
    queryFn: get_contact,
  });
  const saveIncome = async (income: IncomeTransaction) => {
    const response = await api.post("/transactions/income", income);
    return response.data;
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: saveIncome,
    mutationKey: ["saveIncome"],
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    }
  });
  const handleSave = () => {
    if (mutation.isPending) {
      return;
    }
    if (amount === 0) {
      setError("Amount cannot be zero");
      return;
    }
    if (selectedContact === "") {
      setError("Select a contact");
      return;
    }
    if (selectedDate === null) {
      setError("Select a date");
      return;
    }
    if (bankaccount === "") {
      setError("Select a bank account");
      return;
    }
    if (incomeaccount === "") {
      setError("Select an Income account");
      return;
    }
    mutation.mutate({
      amount:amount,
      date: selectedDate.toISOString(),
      description:description,
      partner_id: selectedContact,
      income_account_id: incomeaccount,
      payment_account_id: bankaccount,
    });
  }
  
  
  return (
    <>
      <GradientDialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
      >
        
        <GlassmorphicPaper>
          <Toolbar className="bg-transparent">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2, flex: 1 }}>
              New Income
            </Typography>
          </Toolbar>
        </GlassmorphicPaper>
        <List className="w-96" sx={{ marginX: "auto" }}>
          <ListItem>
            <TextField label="Amount" className="w-full" type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
            error={error === "Amount cannot be zero"}
            helperText={error === "Amount cannot be zero" ? "Amount cannot be zero" : ""}

             />
          </ListItem>
          <ListItem>
            <TextField label="Description" className="w-full" 
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            error={error === "Description cannot be empty"}
            helperText={error === "Description cannot be empty" ? "Description cannot be empty" : ""}
            />
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <Autocomplete
              className="w-full"
              options={contacts?.partners??[]}
              getOptionLabel={(option) => option.name}
              getOptionKey={(option) => option.id}
              onChange={(e, value) =>setSelectedContact(value?.id??'')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payee"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Time" className=" w-full" 
              value={selectedDate}
              onAccept={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <SelectField
              label="Bank Account"
              value={bankaccount}
              valuefield="account_id"
              labelfield="name"
              onChange={setBankAccount}
              options={bank_accounts}
            />
           
          </ListItem>
          <ListItem>
          <SelectField
              label="Income Account"
              value={incomeaccount}
              valuefield="account_id"
              labelfield="name"
              onChange={setIncomeAccount}
              options={income_accounts}
            />
          </ListItem>

          <div className="h-3" />
          <ListItem>
            <GradientButton onClick={handleSave} className="normal-case font-bold text-2xl w-full">
              Add Income
            </GradientButton>
          </ListItem>
        </List>
      </GradientDialog>
    </>
  );
};
