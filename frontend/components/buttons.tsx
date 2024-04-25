'use client';
import React from 'react';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { BorderAll, BorderColor, BorderStyle } from '@mui/icons-material';


export const TextButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&.MuiButton-root': {
        color: '#CDC4EE',
        border: 0,
        borderRadius: 7,
        height: 54,
        padding: '0 30px',
    },
    '&.MuiButton-root:hover': {
        background: 'rgba(0, 0, 0, 0)',
        color: '#E8BCAE',
    },
    '&.MuiButton-root:active': {
        background: 'rgba(0, 0, 0, 0)',
        color: '#FFFFFF',
    }

}));


export const GradientButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&.MuiButton-root': {
        background: 'linear-gradient(90deg, #CDC4EE 0%, #E8BCAE 100%)',
        border: 0,
        borderRadius: 7,
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.1)',
        color: 'rgba(0, 0, 0, 0.80)',
        height: 54,
        padding: '0 30px',
        fontSize: 22,
        fontWeight: 500,
        transition: 'all 0.3s',
    },
    '&.MuiButton-root:hover': {
        color: 'rgba(164, 89, 67, 1)'
    },

}));


interface ExtendedButtonProps extends ButtonProps {
    fontSize?: number | string;
  }


export const GlassmorphicButton = styled(Button)<ExtendedButtonProps>(({ theme, fontSize= 20 }) => ({
    '&.MuiButton-root': {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        border:' 1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 7,
        color: 'rgba(255, 255, 255, 0.80)',
        height: 54,
        padding: '0 20px',
        textTransform: 'none',
        boxShadow: '5px 8px 25px 0 rgba(0, 0, 0, 0.2)',
        fontSize: fontSize  ,
        fontWeight: 400,
        backdropFilter: 'blur(10px)',
    },
    '&.MuiButton-root:hover': {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    '&.MuiButton-root .MuiButton-startIcon': {
        marginRight: 'auto',
    },
    
}));