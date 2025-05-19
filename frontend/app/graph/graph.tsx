import {LineChart} from "@mui/x-charts";
import type {CommoditiesInMonth} from "~/const/dto";
import {monthUILength} from "~/const/layout-consts";
import type {LabelType} from "~/const/labels";
import {format} from "date-fns";
import {Box} from "@mui/material";

type GraphProps = {
  dataset: CommoditiesInMonth[]
  labels: LabelType
}
const xAxisOffset = 55
export default function Graph({dataset, labels}: GraphProps) {

  return (
    <Box sx={{display: "inline-block"}}>
      <LineChart
        slotProps={{
          legend: {
            direction: "vertical",
            position: {
              horizontal: "start"
            }
          }
        }}
        height={400}
        width={(dataset.length) * monthUILength + xAxisOffset}
        grid={{vertical: true, horizontal: true}}
        xAxis={[
          {
            scaleType: "point",
            dataKey: "date",
            valueFormatter: (date: Date) => format(date as Date, 'MM/yyyy'),
          },
        ]}
        series={Object.keys(labels).map((key) => ({
          dataKey: key,
          label: labels[key],
          showMark: false
        }))}
        dataset={dataset}
      />
    </Box>
  )
}