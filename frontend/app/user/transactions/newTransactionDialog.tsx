import * as React from 'react';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { GlassmorphicDialog } from "@/components/dialogs";
import { FormControl, Grow, InputAdornment, InputLabel, ListItem, MenuItem, Select, TextField, Zoom } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { GlassmorphicPaper } from "@/components/paper";
import { GradientButton } from '@/components/buttons';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Zoom ref={ref} {...props} />;
});


export const NewExpenseDialog = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <>
            <GlassmorphicDialog fullScreen open={open} TransitionComponent={Transition}>
                <GlassmorphicPaper>
                    <Toolbar className='bg-transparent'>
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
                <List className='w-96' sx={{ marginX: 'auto' }}>
                    <ListItem>
                        <TextField
                            label="Amount"
                            className='w-full'
                            type='number'
                        />
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <TextField
                            label="Recipient"
                            className='w-full'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Time"
                                className=' w-full'
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel id="categorySelectLabel">Category</InputLabel>
                            <Select
                                labelId="categorySelectLabel"
                                label="Category"
                                className='w-full'
                                placeholder='Select Category'
                                MenuProps={{
                                    classes: {
                                        paper: "bg-transparent",
                                        list: "backdrop-blur-lg bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic",
                                    },
                                    PaperProps: {
                                        style: {
                                            backgroundColor: 'transparent',
                                            backgroundImage: 'none',
                                            borderRadius: 20,
                                        }
                                    }
                                }}
                            >
                            <MenuItem value='1'>Groceries</MenuItem>
                            <MenuItem value='2'>Utilities</MenuItem>
                            <MenuItem value='3'>Transport</MenuItem>
                            <MenuItem value='4'>Rent</MenuItem>
                            <MenuItem value='5'>Health</MenuItem>
                            <MenuItem value='6'>Entertainment</MenuItem>
                            <MenuItem value='7'>Education</MenuItem>
                            <MenuItem value='8'>Others</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <div className='h-3' />
                <ListItem>
                    <GradientButton
                        className="normal-case font-bold text-2xl w-full"
                    >
                        Add Expense
                    </GradientButton>
                </ListItem>


            </List>
        </GlassmorphicDialog >
        </>
    );
};


export const NewIncomeDialog = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
    return (
        <>
            <GlassmorphicDialog fullScreen open={open} TransitionComponent={Transition}>
                <GlassmorphicPaper>
                    <Toolbar className='bg-transparent'>
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
                <List className='w-96' sx={{ marginX: 'auto' }}>
                    <ListItem>
                        <TextField
                            label="Amount"
                            className='w-full'
                            type='number'
                        />
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <TextField
                            label="Payer"
                            className='w-full'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}

                        />
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Time"
                                className=' w-full'
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <div className='h-3' />
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel id="categorySelectLabel">Category</InputLabel>
                            <Select
                                labelId="categorySelectLabel"
                                label="Category"
                                className='w-full'
                                placeholder='Select Category'
                                MenuProps={{
                                    classes: {
                                        paper: "bg-transparent",
                                        list: "backdrop-blur-lg bg-glassmorphic-gradient rounded-3xl border border-opacity-5 border-white shadow-glassmorphic",
                                    },
                                    PaperProps: {
                                        style: {
                                            backgroundColor: 'transparent',
                                            backgroundImage: 'none',
                                            borderRadius: 20,
                                        }
                                    }
                                }}
                            >
                            <MenuItem value='1'>Salary</MenuItem>
                            <MenuItem value='2'>Business</MenuItem>
                            <MenuItem value='8'>Others</MenuItem>
                        </Select>
                    </FormControl>
                </ListItem>
                <div className='h-3' />
                    <ListItem>
                        <GradientButton
                            className="normal-case font-bold text-2xl w-full"
                        >
                            Add Income
                        </GradientButton>
                    </ListItem>
                </List>
            </GlassmorphicDialog>
        </>
    );
}