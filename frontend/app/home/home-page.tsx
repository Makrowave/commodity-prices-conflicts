import React, {useEffect, useState} from "react";
import {Box, Paper, CircularProgress, Typography} from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";
import Timeline from "~/graph/timeline";
import type {Conflict, ConflictQuery} from "~/const/dto";
import Selector from "~/graph/selector";
import {selectorHeight, topBarHeight} from "~/const/layout-consts";
import GraphWrapper from "~/graph/graph-wrapper";
import Graph from "~/graph/graph";
import {createCommodityData} from "~/const/mock-data";
import {energyKeyLabels, foodKeyLabels, metalKeyLabels} from "~/const/labels";


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
  const updateQuery = (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => {
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
    <Box sx={{display: "flex"}}>
      <TopBar/>
      <PageNavigation/>
      <Selector query={query} updateQuery={updateQuery}/>
      <Paper component="main"
             sx={{flexGrow: 1, flexDirection: "column", marginTop: `${selectorHeight + topBarHeight - 10}px`}}>

        {loading && <CircularProgress/>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <>
            <Box id={"energy-graph"}>
              <Typography variant={"h4"} sx={{p: 2}}>Energetyka</Typography>
              <GraphWrapper>
                <Graph dataset={createCommodityData(query.from, query.to, Object.keys(energyKeyLabels))}
                       labels={energyKeyLabels}/>
                <Timeline conflicts={conflicts} timeframeStart={query.from} timeframeEnd={query.to}/>
              </GraphWrapper>
            </Box>
            <Box id={"food-graph"}>
              <Typography variant={"h4"} sx={{p: 2}}>Żywność</Typography>
              <GraphWrapper>
                <Graph dataset={createCommodityData(query.from, query.to, Object.keys(foodKeyLabels))}
                       labels={foodKeyLabels}/>
                <Timeline conflicts={conflicts} timeframeStart={query.from} timeframeEnd={query.to}/>
              </GraphWrapper>
            </Box>
            <Box id={"metal-graph"}>
              <Typography variant={"h4"} sx={{p: 2}}>Metale</Typography>
              <GraphWrapper>
                <Graph dataset={createCommodityData(query.from, query.to, Object.keys(metalKeyLabels))}
                       labels={metalKeyLabels}/>
                <Timeline conflicts={conflicts} timeframeStart={query.from} timeframeEnd={query.to}/>
              </GraphWrapper>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
