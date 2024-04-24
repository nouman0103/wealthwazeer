import { GlassmorphicDialog } from "@/components/dialogs";
import { useAuth } from "@/context/AuthContex";
import { handleError } from "@/utls/handleError";
import {
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
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export const AddAccountPopup = ({
  open,
  handleClose,
  selectedAccountType,
}: {
  open: boolean;
  handleClose: () => void;
  selectedAccountType: string;
}) => {
  const formControlLabelSX = {
    "&.MuiFormControlLabel-root .MuiFormControlLabel-label": {
      fontSize: "20px",
      fontWeight: 400,
    },
  };
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState(selectedAccountType); 
  const { api } = useAuth();
  const add_account = async () => {
    const response = await api.post("/accounts", {
      name: name,
      account_type: selectedAccountType,
    });
    return response.data;
  };
  
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: add_account,
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ["accountdetail"],
      });
    },
    onError: (error:AxiosError) => {
      setError(handleError(error))
    }
  });
  return (
    <GlassmorphicDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create New Account</DialogTitle>
      <DialogContent
        sx={{
          paddingX: "50px",
        }}
      >
        {
          error && <div className="text-red-500 text-center">{error}</div>
        }
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="h-6" />
        <FormControl variant="standard" className="w-full">
          <FormLabel
            id="demo-simple-select-label"
            className="text-white text-opacity-80 text-xl"
          >
            Account Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={accountType}
            name="radio-buttons-group"
            className="ml-4"
            value={accountType}
          >
            <FormControlLabel
              value="Bank and Cash"
              control={<Radio size="small" />}
              label="Bank Account"
              sx={formControlLabelSX}
              onClick={() => setAccountType("Bank and Cash")}
              
            />
            <FormControlLabel
              value="Income"
              control={<Radio size="small" />}
              label="Income Account"
              sx={formControlLabelSX}
              onClick={() => setAccountType("Income")}
            />
            <FormControlLabel
              value="Expenses"
              control={<Radio size="small" />}
              label="Expense Account"
              sx={formControlLabelSX}
              onClick={() => setAccountType("Expenses")}
            />
          </RadioGroup>
        </FormControl>
        <div className="h-1" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>mutation.mutate()} color="primary">
          Create
        </Button>
      </DialogActions>
    </GlassmorphicDialog>
  );
};
