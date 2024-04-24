"use client";

import { AccountCard, AddAccountCard } from "@/components/card";
import { useAuth } from "@/context/AuthContex";
import Divider from "@mui/material/Divider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GlassmorphicDialog } from "@/components/dialogs";
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { GlassmorphicInputField } from "@/components/inputs";

type Account = {
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

  return (
    <>
      <div className="p-8 flex flex-col gap-5 flex-grow overflow-hidden">
        <div className="flex justify-between">
          <text className="text-2xl font-semibold text-white text-opacity-80 my-auto">
            Accounts
          </text>
        </div>

        <div className="flex flex-row flex-wrap gap-8">
          <div className="flex flex-col flex-wrap gap-8">
            <text className="text-xl font-semibold text-white ">
              Bank Accounts
            </text>
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
            <AddAccountCard accountType="Bank" onClick={handleClickOpen} />

          </div>
          <Divider orientation="vertical" flexItem />

          <div className="flex flex-col flex-wrap gap-8">
            <text className="text-xl font-semibold text-white">
              Income Accounts
            </text>
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
            <AddAccountCard accountType="Income" onClick={handleClickOpen} />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col flex-wrap gap-8">
            <text className="text-xl font-semibold text-white ">
              Expense Accounts
            </text>
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
            <AddAccountCard accountType="Expense" onClick={handleClickOpen} />
          </div>
        </div>
      </div>

      <GlassmorphicDialog
        open={newAccountPopupOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
        <DialogContent sx={
          {
            paddingX: "40px",
            paddingY: "20px",
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
          />
          <div className="h-5"/>
          <FormControl variant="standard" className="w-full">
            <InputLabel id="demo-simple-select-label" className="text-white text-opacity-80 text-xl">
              Account Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              className="w-full"
              label="Account Type"
            >
              <MenuItem value="Bank Account">Bank Account</MenuItem>
              <MenuItem value="Income Account">Income Account</MenuItem>
              <MenuItem value="Expenses Account">Expenses Account</MenuItem>
            </Select>
          </FormControl>
          <div className="h-2"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </GlassmorphicDialog>
    </>
  );
}
