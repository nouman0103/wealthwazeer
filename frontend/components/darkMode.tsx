'use client';

import { createTheme } from "@mui/material/styles";

import { saira_semi_condensed } from "../app/layout";
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
        fontSize: 20,
        fontWeightRegular: 500,
      fontFamily: saira_semi_condensed.style.fontFamily
    },
    
  });