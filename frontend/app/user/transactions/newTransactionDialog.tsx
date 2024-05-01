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
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContex";

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

export const NewExpenseDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [bankaccount, setBankAccount] = React.useState("");
  const [expenseaccount, setExpenseAccount] = React.useState("");
  const {api} = useAuth();
  const get_bank_account = async () => {
    const response = await api.get("/accounts/bank");
    return response.data;
  };
  const get_expense_accounts = async () => {
    const response = await api.get("/accounts/expense");
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
            <TextField label="Amount" className="w-full" type="number" />
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <Autocomplete
              className="w-full"
              options={["John Doe", "Jane Doe" ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Recipient"
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
              <DateTimePicker label="Time" className=" w-full" />
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
            <GradientButton className="normal-case font-bold text-2xl w-full">
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
            <TextField label="Amount" className="w-full" type="number" />
          </ListItem>
          <div className="h-3" />
          <ListItem>
          <Autocomplete
              className="w-full"
              options={["John Doe", "Jane Doe" ]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Payer"
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
              <DateTimePicker label="Time" className=" w-full" />
            </LocalizationProvider>
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="categorySelectLabel">Category</InputLabel>
              <Select
                labelId="categorySelectLabel"
                label="Category"
                className="w-full"
                placeholder="Select Category"
                MenuProps={{
                  classes: {
                    paper: "bg-transparent",
                    list: "backdrop-blur-lg bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic",
                  },
                  PaperProps: {
                    style: {
                      backgroundColor: "transparent",
                      backgroundImage: "none",
                      borderRadius: 20,
                    },
                  },
                }}
              >
                <MenuItem value="1">Salary</MenuItem>
                <MenuItem value="2">Business</MenuItem>
                <MenuItem value="8">Others</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <div className="h-3" />
          <ListItem>
            <GradientButton className="normal-case font-bold text-2xl w-full">
              Add Income
            </GradientButton>
          </ListItem>
        </List>
      </GradientDialog>
    </>
  );
};
