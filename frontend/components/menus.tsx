import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Filter } from '@mui/icons-material';




export const GlassmorphicMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 14,
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(7px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: '5px 8px 20px 0 rgba(0, 0, 0, 0.07)',
        textAlign: 'center',
    },
    '& .MuiList-root': {
        padding: 4,
        backgroundColor: 'transparent',
        textAlign: 'center',
        minWidth: 150,

    },
    '& .MuiMenuItem-root': {
        backgroundColor: 'transparent',
        borderRadius: 10,
        color: 'rgba(255, 255, 255, 0.80)',
        fontSize: 20,
        fontWeight: 400,
        transition: '0.2s',

        '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
        '&:hover': {
            color: 'rgba(255, 255, 255, 1)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.4)',
        },

    },
  }));
