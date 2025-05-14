import React from "react";
import { Box, Paper } from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";
import Timeline from "~/graph/timeline";
import { conflicts } from "~/const/mock-data";

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
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
          <Timeline conflicts={conflicts} timeframeStart={new Date("2010-01-01")} timeframeEnd={new Date("2025-01-01")} />
          <Timeline conflicts={conflicts} timeframeStart={new Date("2010-01-01")} timeframeEnd={new Date("2025-01-01")} />
        </Paper>
      </Paper>
    </Box>
  );
}
