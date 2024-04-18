'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';


export const GlassmorphicInputField = styled((props: TextFieldProps) => (
    <TextField
        {...props}
        InputLabelProps={{
            sx: {
                display: 'flex',
                'text, svg': {
                    color: 'rgba(255, 255, 255, 0.50)',
                },
                'text': {
                    fontSize: 20,
                    fontWeight: 400,
                },
                
                '&.Mui-focused text, &.Mui-focused svg': {
                    color: 'rgba(255, 255, 255, 0.20)',
                },
                '&.MuiInputLabel-shrink text, &.MuiInputLabel-shrink svg': {
                    color: 'rgba(255, 255, 255, 0.20)',
                },
            },

        }}
    />
))(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        fontSize: 20,
        fontWeight: 400,
        '& fieldset': {
            border: '1px solid rgba(255, 255, 255, 0.07)',
            backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
            boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
            borderRadius: 100,
            
        },
        '&:hover fieldset': {
            backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
        },
        '& label.Mui-focused': {
            color: 'yellow',
        },
    },
}));