'use client';
import React from 'react';
import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

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
