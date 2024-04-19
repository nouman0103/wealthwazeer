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
    },
    typography: {
        fontSize: 20,
        fontWeightRegular: 500,
      fontFamily: saira_semi_condensed.style.fontFamily
    },
    
  });