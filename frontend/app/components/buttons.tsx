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
        boxShadow: '0px -4px 35px -24px rgba(0, 0, 0, 0.25)',
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
        boxShadow: '0px -4px 35px -24px rgba(0, 0, 0, 0.25)',
        color: 'rgba(0, 0, 0, 0.80)',
        height: 54,
        padding: '0 30px',
    }
}));


export const TranslucentButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&.MuiButton-root': {
        background: 'rgba(255, 255, 255, 0.05)',
        border:' 1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 7,
        boxShadow: '0px -4px 35px -24px rgba(0, 0, 0, 0.25)',
        color: 'rgba(255, 255, 255, 0.80)',
        height: 54,
        padding: '0 30px',
        textTransform: 'none',
    }
}));