import {LineChart} from "@mui/x-charts";
import type {CommoditiesInMonth} from "~/const/models";
import {legendWidth, monthUILength} from "~/const/layout-consts";
import type {CommodityLabel} from "~/const/labels";
import {format} from "date-fns";
import {Box} from "@mui/material";

type GraphProps = {
  dataset: CommoditiesInMonth[]
  labels: CommodityLabel[]
}

const xAxisOffset = 55;

export default function Graph({dataset, labels}: GraphProps) {
  return (
    <Box sx={{display: "inline-block", bgcolor: "transparent", zIndex: 2, position: "relative"}}>
      <LineChart
        slotProps={{
          legend: {
            direction: "vertical",
            position: {
              horizontal: "start"
            },
            sx: {
              width: legendWidth,
            }
          }
        }}
        height={540}
        width={dataset.length * monthUILength + xAxisOffset}
        grid={{vertical: true, horizontal: true}}
        xAxis={[
          {
            scaleType: "point",
            dataKey: "date",
            valueFormatter: (date: Date) => format(date as Date, "MM/yyyy"),
          },
        ]}
        series={labels.map(({key, label, unit}) => ({
          dataKey: key,
          label: `${label} ${unit}`,
          showMark: false
        }))}
        dataset={dataset}
      />
    </Box>
  );
}
