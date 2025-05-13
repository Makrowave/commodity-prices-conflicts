import React from "react";
import { Box, Paper } from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";


export default function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <PageNavigation />

      <Paper
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,         // Add top margin for AppBar height (64px)
        }}
      >
        <Paper sx={{ p: 2 }}>Content</Paper>
      </Paper>
    </Box>
  );
}
