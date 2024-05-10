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
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; 
// import { AxiosError } from "axios"; 
import { useState } from "react";

export const ProfilePopup = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const {user,api} = useAuth();
  const [name, setName] = useState(user?.name);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.put("/users", {
        name: name,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      handleClose();
    }
  })
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
    console.log("Name:", setName);
    handleClose();
  };

  return (
    <GlassmorphicDialog open={open} onClose={handleClose}>
      <DialogTitle>Profile</DialogTitle>
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
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>mutation.mutate()}>Save</Button>
        <Button onClick={handleAddSaving}>Cancel</Button>
      </DialogActions>
    </GlassmorphicDialog>
    
  );
};
