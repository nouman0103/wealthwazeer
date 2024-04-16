'use client';
import React from 'react';
import { styled } from '@mui/material';
import {DataGrid, DataGridProps} from '@mui/x-data-grid';


export  const GlassmorphicDataGrid = styled((props: DataGridProps) => (
        <DataGrid
            {...props}           
        />
    ))(({ theme }) => ({
    '&.MuiDataGrid-root': {
        
        borderRadius: 30,
        color: 'rgba(255, 255, 255, 0.80)',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
    },
    '&.MuiDataGrid-root .MuiDataGrid-cell': {
        backgroundColor: '',
    },
    '&.MuiDataGrid-root .MuiDataGrid-container--top [role=row]' : {
        background: "transparent",
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%) !important',
        borderRadius: 30
    }
  }));

