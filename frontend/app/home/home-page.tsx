import React, { useEffect, useState } from "react";
import { Box, Paper, CircularProgress, Typography } from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";
import Timeline from "~/graph/timeline";
import type {Conflict, ConflictQuery} from "~/const/dto";
import Selector from "~/graph/selector";
import {selectorHeight} from "~/const/layout-consts";
import GraphWrapper from "~/graph/graph-wrapper";


const toConflictQuery = (query: ConflictQuery) => {
  const resultQuery = new URLSearchParams({
    from: query.from.toISOString(),
    to: query.to.toISOString(),
  });
  query.regions.forEach(region => resultQuery.append('region', region));
  return resultQuery;
}

export default function HomePage() {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [query, setQuery] = useState<ConflictQuery>({
    from: new Date("2010-01-01"),
    to: new Date(),
    regions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const updateQuery= (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => {
    setQuery((prev) => ({...prev, [key]: value}));
    console.log(value);
  }

  useEffect(() => {
    const fetchConflicts = async () => {
      // const timeframeStart = new Date("2010-01-01");
      // const timeframeEnd = new Date("2025-01-01");
      // const testQuery = new URLSearchParams({
      //   from: timeframeStart.toISOString(),
      //   to: timeframeEnd.toISOString(),
      // });

      try {
        // const response = await fetch(`http://localhost:5116/api/conflicts?${testQuery}`);
        const response = await fetch(`http://localhost:5116/api/conflicts?${toConflictQuery(query)}`);
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
  }, [query]);

  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <PageNavigation />
      <Paper component="main" sx={{ flexGrow: 1, mt: 8, flexDirection: "column" }}>
        <Selector query={query} updateQuery={updateQuery} />
        <GraphWrapper sx={{marginTop: `${selectorHeight}px`}}>
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {!loading && !error && (
            <>
              <Timeline conflicts={conflicts} timeframeStart={query.from} timeframeEnd={query.to} />
            </>
          )}
        </GraphWrapper>
      </Paper>
    </Box>
  );
}
