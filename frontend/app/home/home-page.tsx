import React, { useEffect, useState } from "react";
import { Box, Paper, CircularProgress, Typography } from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";
import Timeline from "~/graph/timeline";
import type { Conflict } from "~/const/dto";

const timeframeStart = new Date("2010-01-01");
const timeframeEnd = new Date("2025-01-01");

export default function HomePage() {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        const query = new URLSearchParams({
          from: timeframeStart.toISOString(),
          to: timeframeEnd.toISOString(),
        });

        const response = await fetch(`http://localhost:5116/api/conflicts?${query}`);
        if (!response.ok) throw new Error("Failed to fetch conflicts");

        const rawData = await response.json();
        const parsed: Conflict[] = rawData.map((conflict: any): Conflict => ({
          ...conflict,
          start: new Date(conflict.start),
          end: conflict.end ? new Date(conflict.end) : null,
          events: conflict.events.map((e: any) => ({
            ...e,
            date: new Date(e.date),
          })),
        }));

        setConflicts(parsed);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchConflicts();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <PageNavigation />
      <Paper component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 4 }}>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <>
              <Timeline conflicts={conflicts} timeframeStart={timeframeStart} timeframeEnd={timeframeEnd} />
              <Timeline conflicts={conflicts} timeframeStart={timeframeStart} timeframeEnd={timeframeEnd} />
            </>
          )}
        </Paper>
      </Paper>
    </Box>
  );
}
