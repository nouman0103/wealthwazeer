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


export const AddContactPopup = ({
    open,
  handleClose
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
        const response = await api.post("/contacts", {
            name: name,
            email: email,
            phone: phone,
            city: city
        });
        return response.data;
    };

    const queryClient = useQueryClient();
    const [error, setError] = useState("");
    return (
        <GlassmorphicDialog open={open} onClose={handleClose}>
            <DialogTitle>
                Add Contact
            </DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column", gap:"1rem", width: "25rem"}}>
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
                <Button onClick={handleClose}>
                    Add Contact
                </Button>
            </DialogActions>
        </GlassmorphicDialog>
    );
}