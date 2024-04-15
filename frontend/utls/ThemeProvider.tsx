"use client"

import { darkTheme } from "@/components/darkMode"
import { ThemeProvider } from "@mui/material"

export const MyThemeProvider = ({ children }: { children: React.ReactNode }) => {
 return (
 <ThemeProvider theme={darkTheme}>
        {children}
    </ThemeProvider>)
}