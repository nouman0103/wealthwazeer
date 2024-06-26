import { GlassmorphicDialog } from "@/components/dialogs";
import { SelectField } from "@/components/selectfield";
import { useAuth } from "@/context/AuthContex";
// import { useAuth } from "@/context/AuthContex"; 
// import { handleError } from "@/utls/handleError";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
// import { AxiosError } from "axios"; 
import { useState } from "react";
import { Account } from "../accounts/page";

export const AddSavingPopup = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  // const { api } = useAuth(); 
  // const add_saving = async () => { 
  //   const response = await api.post("/partners", {
  //     bankAccount: bankAccount ?? undefined, 
  //   }); 
  //   return response.data; 
  // };
  // const queryClient = useQueryClient(); 

  // const mutation = useMutation({ 
  //   mutationFn: add_saving, 
  //   mutationKey: ["add_saving"],
  //   onSuccess: () => { 
  //     queryClient.invalidateQueries({ 
  //       queryKey: ["savings"], 
  //     }); 
  //     handleClose(); 
  //   }, // Commented out for frontend-only implementation
  //   onError: (error: AxiosError) => { 
  //     setError(handleError(error)); 
  //   }, 
  // }); 
  const [error, setError] = useState("");

  const handleAddSaving = () => {
    console.log("Amount:", amount);
    console.log("Bank Account:", bankAccount);
    handleClose();
  };

  const api = useAuth().api;

  const get_bank_account = async () => {
    const response = await api.get("/accounts/bank");
    return response.data;
  };

  const { data: bank_accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["bank_account"],
    queryFn: get_bank_account,
  });

  return (
    <GlassmorphicDialog open={open} onClose={handleClose}>
      <DialogTitle>Update Saving Goal</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "25rem",
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Amount"
          value={amount}
          type="number" 
          onChange={(e) => setAmount(e.target.value)}
          className="w-full"
        />
         <SelectField
          label="Bank Account"
          value="Some Account"
          labelfield="name"
          onChange={(e) => setBankAccount(e)}
          options={bank_accounts}
        />
      </DialogContent>
      <DialogActions className="flex">
        <Button className="text-red-500 mr-auto" color="error">Delete Goal</Button>
        <Button className="ml-auto" onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddSaving}>Add Saving</Button>
      </DialogActions>
    </GlassmorphicDialog>
  );
};
