"use client";

import React from "react";

import { Paper, PaperProps, styled } from "@mui/material";

export const GlassmorphicPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)",
  boxShadow: "5px 8px 20px 0 rgba(0, 0, 0, 0.07)",
  backdropFilter: "blur(10px)",
}));