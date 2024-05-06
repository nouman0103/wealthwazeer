"use client";

import { AccountCard, AddAccountCard } from "@/components/card";
import { useAuth } from "@/context/AuthContex";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GlassmorphicDialog } from "@/components/dialogs";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
} from "@mui/material";
import { GlassmorphicInputField } from "@/components/inputs";
import { AddAccountPopup } from "./AddAccountPopup";

export type Account = {
  name: string;
  balance: number;
  account_type: "Income" | "Expenses" | "Bank and Cash";
};
type AccountDetail = {
  accounts: Account[];
};

export default function Home() {
  const { api } = useAuth();
  const get_account = async () => {
    const response = await api.get("/accounts");
    return response.data;
  };
  const {
    data: account_detail,
    isLoading,
    error,
  } = useQuery<AccountDetail>({
    queryKey: ["accountdetail"],
    queryFn: get_account,
  });
  const [newAccountPopupOpen, setNewAccountPopupOpen] = useState(false);

  const handleClickOpen = () => {
    setNewAccountPopupOpen(true);
  };
  const handleClose = () => {
    setNewAccountPopupOpen(false);
  };

  const [selectedAccountType, setSelectedAccountType] = useState("Bank");
  const handleAccountTypeChange = (accountType: number) => {
    if (accountType === 1) {
      setSelectedAccountType("Bank and Cash");
    } else if (accountType === 2) {
      setSelectedAccountType("Income");
    } else {
      setSelectedAccountType("Expenses");
    }
    setNewAccountPopupOpen(true);
  };

  return (
    <>
      <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden cursor-pointer">
        <div className="flex justify-between">
          <span className="text-2xl font-semibold text-white text-opacity-80 my-auto">
            Accounts
          </span>
        </div>

        <div className="flex flex-row flex-wrap gap-8">
          <div className="flex flex-col flex-wrap gap-8">
            <span className="text-xl text-opacity-80 font-medium text-white mx-auto">
              Bank Accounts
            </span>
            {account_detail?.accounts
              .filter((account) => account.account_type === "Bank and Cash")
              .map((account) => {
                return (
                  <AccountCard
                    accountName={account.name}
                    money={account.balance}
                  />
                );
              })}
            <AddAccountCard
              accountType="Bank"
              onClick={() => {
                handleAccountTypeChange(1);
              }}
            />
          </div>
          <Divider orientation="vertical" flexItem />

          <div className="flex flex-col flex-wrap gap-8">
            <span className="text-xl text-opacity-80 font-medium text-white mx-auto">
              Income Accounts
            </span>
            {account_detail?.accounts
              .filter((account) => account.account_type === "Income")
              .map((account) => {
                return (
                  <AccountCard
                    accountName={account.name}
                    money={account.balance}
                  />
                );
              })}
            <AddAccountCard
              accountType="Income"
              onClick={() => {
                handleAccountTypeChange(2);
              }}
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col flex-wrap gap-8">
            <span className="text-xl text-opacity-80 font-medium text-white mx-auto">
              Expense Accounts
            </span>
            {account_detail?.accounts
              .filter((account) => account.account_type === "Expenses")
              .map((account) => {
                return (
                  <AccountCard
                    accountName={account.name}
                    money={account.balance}
                  />
                );
              })}
            <AddAccountCard
              accountType="Expenses"
              onClick={() => {
                handleAccountTypeChange(3);
              }}
            />
          </div>
        </div>
      </div>

      {/* <GlassmorphicDialog
        open={newAccountPopupOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
        <DialogContent sx={
          {
            paddingX: "50px",
          }
        }>
          <TextField
            label={
              <span className="text-white text-opacity-80 text-xl">
                Account Name
              </span>
            }
            variant="standard"
            type="text"
            className="w-full"
            margin="normal"
            autoFocus
          />
          <div className="h-6" />
          <FormControl variant="standard" className="w-full">
            <FormLabel id="demo-simple-select-label" className="text-white text-opacity-80 text-xl">
              Account Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={selectedAccountType}
              name="radio-buttons-group"
              className="ml-4"
            >
              <FormControlLabel value="Bank and Cash" control={<Radio size="small"/>} label="Bank Account" sx={formControlLabelSX}/>
              <FormControlLabel value="Income" control={<Radio size="small"/>} label="Income Account" sx={formControlLabelSX}/>
              <FormControlLabel value="Expenses" control={<Radio size="small"/>} label="Expense Account" sx={formControlLabelSX}/>
            </RadioGroup>
          </FormControl>
          <div className="h-1" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </GlassmorphicDialog> */}
      {newAccountPopupOpen &&
      <AddAccountPopup
        open={newAccountPopupOpen}
        handleClose={handleClose}
        selectedAccountType={selectedAccountType}
      />}
    </>
  );
}
