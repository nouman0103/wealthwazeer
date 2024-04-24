'use client';

import { createTheme } from "@mui/material/styles";
import { Saira_Semi_Condensed } from "next/font/google";

const saira_semi_condensed = Saira_Semi_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#fccaff',
        main: '#FCBDFF',
        dark: '#b084b2',
        contrastText: '#000',
      },
      secondary: {
        light: '#ecc9be',
        main: '#E8BCAE',
        dark: '#a28379',
        contrastText: '#000',
      },
    },
    typography: {
        fontSize: 20,
        fontWeightRegular: 500,
      fontFamily: saira_semi_condensed.style.fontFamily
    },
    
  });