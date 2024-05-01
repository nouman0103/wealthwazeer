import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


export const GlassmorphicDialog =  styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root':{
        backgroundColor: 'transparent',
    },
    '& .MuiDialog-paper': {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.06) 100%)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
    },
    '& .MuiDialogTitle-root': {
    },
}));



export const GradientDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundImage: 'linear-gradient(106deg, #181823 36.4%, #1D1625 100%)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
    },
    '& .MuiDialogTitle-root': {
        backgroundColor: 'transparent',
    },
}));
