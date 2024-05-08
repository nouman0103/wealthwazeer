import { GlassmorphicDialog } from "@/components/dialogs";
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
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export const AddContactPopup = ({
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
  const { api } = useAuth();
  const add_contact = async () => {
    const response = await api.post("/partners", {
      name: name,
      email: email ?? undefined,
      phone: phone ?? undefined,
      city: city ?? undefined,
    });
    return response.data;
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: add_contact,
    mutationKey: ["add_contact"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["infiniteContacts"],
      });
      handleClose();
    },
    onError: (error: AxiosError) => {
      setError(handleError(error));
    },
  });
  const [error, setError] = useState("");
  return (
    <GlassmorphicDialog open={open} onClose={handleClose}>
      <DialogTitle>Add Contact</DialogTitle>
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
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <TextField
          label="Phone"
          variant="standard"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
        />
        <TextField
          label="City"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={()=>mutation.mutate()}>Add Contact</Button>
      </DialogActions>
    </GlassmorphicDialog>
  );
};
