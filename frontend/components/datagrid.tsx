'use client';
import React from 'react';
import { Paper, styled } from '@mui/material';
import { Popper, PopperProps} from '@mui/base/Popper';
import {
    DataGrid, DataGridProps, 
    GridColumnMenu,
    GridColumnMenuFilterItem,
    GridColumnMenuSortItem,
    GridColumnMenuColumnsItem,
    GridColumnMenuItemProps,
    GridColumnMenuProps,
    DEFAULT_GRID_AUTOSIZE_OPTIONS
} from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';

export const IncomingIcon = () => {
    return (
        <ArrowDownwardRoundedIcon className="font-light font-base text-green-400 text-opacity-50 drop-shadow-glassmorphic"/>
    );
}

export const OutgoingIcon = () => {
    return (
        <ArrowUpwardRoundedIcon className="font-light font-base text-red-400 text-opacity-50 drop-shadow-glassmorphic"/>
    );
}

export const spopper = styled((props: PopperProps) => (
    <Popper {...props} />
))(({ theme }) => ({
    backgroundColor: 'transparent',
    borderRadius: 20,
    color: 'rgba(255, 255, 255, 0.80)',
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
    },
}));

export const glassmorphicColumnMenu = styled((props: GridColumnMenuProps) => (
    <GridColumnMenu 
    {...props}
    slots={{
        columnMenuColumnsItem: null,
    }}
    />
))(({ theme }) => ({
    backgroundColor: 'transparent',
    borderRadius: 20,
    '& .MuiListItemIcon-root': {
        color: 'rgba(255, 255, 255, 0.80)',
    },
    '& .MuiListItemText-primary': {
        color: 'rgba(255, 255, 255, 0.80)',
        fontSize: 16,
        fontWeight: 300,
    },
}));

export const GlassmorphicDataGrid = styled((props: DataGridProps) => (
    <DataGrid
        {...props}
        slots={{
            columnMenu: glassmorphicColumnMenu,
            basePopper: spopper,
        }}
        slotProps={{
            filterPanel: {
                sx: {
                    backgroundColor: 'transparent',
                    borderRadius: 20,
                    color: 'rgba(255, 255, 255, 0.80)',
                    '&.MuiDataGrid-panel .MuiPaper-root': {
                        backgroundColor: 'transparent',
                    },
                },
            }
        }}
        rowHeight={70}
    />
))(({ theme }) => ({
    '&.MuiDataGrid-root': {
        borderRadius: 20,
        color: 'rgba(255, 255, 255, 0.80)',
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
    },
    '&.MuiDataGrid-root .MuiDataGrid-container--top [role=row]': {
        background: "transparent",
        backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%) !important',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
        color: 'rgba(255, 255, 255, 0.80)',
        fontSize: 18,
        fontWeight: 600,
    },
    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer': {
    },

    '&.MuiDataGrid-root .MuiDataGrid-columnHeaderDraggableContainer:hover': {

    },

    '&.MuiDataGrid-root .MuiDataGrid-cell': {
        fontSize: 16,
        fontWeight: 200,
        color: 'rgba(255, 255, 255, 0.80)',
    },
}));