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
        boxShadow: '5px 8px 20px rgba(0, 0, 0, 0.07)',
        color: 'rgba(0, 0, 0, 0.80)',
        height: 54,
        padding: '0 30px',
        fontSize: 22,
        fontWeight: 500,
        transition: 'all 0.3s',
    },
    '&.MuiButton-root:hover': {
        fontWeight: 700,
    },

}));


export const TranslucentButton = styled(Button)<ButtonProps>(({ theme }) => ({
    '&.MuiButton-root': {
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        border:' 1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 7,
        color: 'rgba(255, 255, 255, 0.80)',
        height: 54,
        padding: '0 30px',
        textTransform: 'none',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        fontSize: 22,
        fontWeight: 500,
    }
}));