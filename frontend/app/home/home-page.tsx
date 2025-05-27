import React, {useState} from "react";
import {Box, Paper, CircularProgress, Typography} from "@mui/material";
import PageNavigation from "~/navigation/page-navigation";
import TopBar from "~/navigation/top-bar";
import Timeline from "~/graph/timeline";
import type {CommoditiesInMonth, Conflict, ConflictDto, ConflictQuery} from "~/const/models";
import Selector from "~/graph/selector";
import {selectorHeight, topBarHeight} from "~/const/layout-consts";
import GraphWrapper from "~/graph/graph-wrapper";
import Graph from "~/graph/graph";
import {energyKeyLabels, foodKeyLabels, metalKeyLabels} from "~/const/labels";
import {useQuery} from "@tanstack/react-query";
import {useAxiosPrivate} from "~/api/axios";
import {useAuth} from "~/auth/auth-context";
import {endpoints} from "~/const/endpoints";


const toConflictQuery = (query: ConflictQuery) => {
  const resultQuery = new URLSearchParams({
    from: (new Date(query.from)).toISOString(),
    to: (new Date(query.to)).toISOString(),
  });
  query.regions.forEach(region => resultQuery.append('region', region));
  return resultQuery;
}

const toDateQuery = (query: ConflictQuery) => {
  const date2 = new Date(query.to);
  date2.setMonth(date2.getMonth() + 1);
  return new URLSearchParams({
    from: (new Date(query.from)).toISOString(),
    to: (new Date(date2)).toISOString(),
  });
}

export default function HomePage() {
  const {isLoggedIn} = useAuth()
  const [query, setQuery] = useState<ConflictQuery>({
    from: new Date("2010-01-01"),
    to: new Date("2025-03-01"),
    regions: ["1", "2", "3", "4", "5"],
  });
  const updateQuery = (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => {
    setQuery((prev) => ({...prev, [key]: value}));
  }

  const axiosPrivate = useAxiosPrivate()
  const {
    data: commodityData,
    isError: isCommodityError,
    isFetching: isCommodityFetching,
    error: commodityError
  } = useQuery({
    queryKey: [endpoints.commodities, query.from, query.to],
    queryFn: async () => {
      const response = await axiosPrivate.get(`${endpoints.commodities}?${toDateQuery(query)}`);
      return response.data as CommoditiesInMonth[];
    },
    enabled: isLoggedIn,
    placeholderData: (previousData) => previousData,
  });


  const {data: conflictData, isError: isConflictError, isLoading: isConflictLoading, error: conflictError} = useQuery({
    queryKey: [endpoints.conflicts, query],
    queryFn: async () => {
      const response = await axiosPrivate.get(`${endpoints.conflicts}?${toConflictQuery(query)}`);
      const data = response.data as ConflictDto[];
      return data.map(item => ({
        ...item,
        start: new Date(item.start),
        end: item.end === null ? null : new Date(item.end)
      })) as Conflict[];
    },
    enabled: isLoggedIn,
    placeholderData: (previousData) => previousData,
  })

  return (
    <Box sx={{display: "flex", height: "100%"}}>
      <TopBar/>
      <PageNavigation/>
      <Selector query={query} updateQuery={updateQuery} conflicts={conflictData ?? []}
                commodities={commodityData ?? []}/>
      {
        isLoggedIn ? (
          <Paper component="main"
                 sx={{flexGrow: 1, flexDirection: "column", marginTop: `${selectorHeight + topBarHeight - 10}px`}}>
            <Paper id={"energy-graph"}>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "start", gap: 2}}>
                <Typography variant={"h4"} sx={{p: 2}}>Energy</Typography>
                {isCommodityFetching ? <CircularProgress/> : <></>}
              </Box>
              <GraphWrapper>
                {isCommodityError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {!isCommodityError && commodityData &&
                  <Graph dataset={commodityData} labels={energyKeyLabels}/>
                }
                {isConflictError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {
                  !isConflictError && !isConflictLoading &&
                  <Timeline conflicts={conflictData!} timeframeStart={query.from} timeframeEnd={query.to}/>
                }
              </GraphWrapper>
            </Paper>
            <Paper id={"food-graph"}>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "start", gap: 2}}>
                <Typography variant={"h4"} sx={{p: 2}}>Food</Typography>
                {isCommodityFetching ? <CircularProgress/> : <></>}
              </Box>
              <GraphWrapper>
                {isCommodityError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {!isCommodityError && commodityData &&
                  <Graph dataset={commodityData} labels={foodKeyLabels}/>
                }
                {isConflictError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {
                  !isConflictError && !isConflictLoading &&
                  <Timeline conflicts={conflictData!} timeframeStart={query.from} timeframeEnd={query.to}/>
                }
              </GraphWrapper>
            </Paper>
            <Paper id={"metal-graph"}>
              <Box sx={{display: "flex", alignItems: "center", justifyContent: "start", gap: 2}}>
                <Typography variant={"h4"} sx={{p: 2}}>Metals</Typography>
                {isCommodityFetching ? <CircularProgress/> : <></>}
              </Box>
              <GraphWrapper>
                {isCommodityError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {!isCommodityError && commodityData &&
                  <Graph dataset={commodityData} labels={metalKeyLabels}/>
                }
                {isConflictError && <Typography color={"error"} sx={{p: 4}}>Error</Typography>}
                {
                  !isConflictError && !isConflictLoading &&
                  <Timeline conflicts={conflictData!} timeframeStart={query.from} timeframeEnd={query.to}/>
                }
              </GraphWrapper>
            </Paper>
          </Paper>
        ) : (
          <Paper component="main" sx={{
            margin: "auto",
            width: 300,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Typography variant={"h6"}>Log in to access data</Typography>
          </Paper>
        )
      }

    </Box>
  );
}
