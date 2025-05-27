import {
  AppBar, Box, Button, Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  Toolbar
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import type {CommoditiesInMonth, Conflict, ConflictQuery} from "~/const/models";
import {drawerWidth, topBarHeight} from "~/const/layout-consts";
import {energyKeyLabels, foodKeyLabels, metalKeyLabels} from "~/const/labels";

type SelectorProps = {
  updateQuery: (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => void;
  query: ConflictQuery;
  conflicts: Conflict[];
  commodities: CommoditiesInMonth[];
};

const handleDownload = (conflicts: Conflict[], commodities: CommoditiesInMonth[]) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({
      conflicts: conflicts,
      commodities: commodities,
      labels: [...foodKeyLabels, ...energyKeyLabels, ...metalKeyLabels]
    }, null, 2)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";
  link.click();
};


export default function Selector({updateQuery, query, conflicts, commodities}: SelectorProps) {

  const handleChange = (event: SelectChangeEvent<typeof query.regions>) => {
    const {
      target: {value},
    } = event;
    updateQuery(
      "regions",
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <AppBar position="fixed"
            sx={{zIndex: 10, marginTop: `${topBarHeight}px`, paddingLeft: `${drawerWidth}px`, bgcolor: "white"}}>
      <Toolbar sx={{zIndex: 10, py: 2}}>
        <DatePicker
          maxDate={(() => {
            const date = new Date(query.to)
            date.setMonth(date.getMonth() - 1)
            return date
          })()}
          sx={{mx: 1}}
          label={"After"} views={['year', 'month']}
          value={query.from}
          onChange={(value) => updateQuery("from", value!)}/>
        <DatePicker
          maxDate={new Date("2025/03/01")}
          minDate={(() => {
            const date = new Date(query.from)
            date.setMonth(date.getMonth() + 1)
            return date
          })()}
          sx={{mx: 1}}
          label={"Before"}
          views={['year', 'month']}
          value={query.to}
          onChange={(value) => updateQuery("to", value!)}/>
        <FormControl sx={{mx: 1, width: 500}}>
          <InputLabel id="region-select">Regions</InputLabel>
          <Select
            labelId="region-select"
            MenuProps={MenuProps}
            multiple
            onChange={handleChange}
            value={query.regions}
            input={<OutlinedInput id="region-select" label="Regions"/>}
            renderValue={(selected) => (
              <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                {selected.map((value) => (
                  <Chip key={value} label={regions.find(r => (r.value === value))!.name}/>
                ))}
              </Box>
            )}
          >
            {
              regions.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button onClick={() => handleDownload(conflicts, commodities)} variant="contained" color="primary">
          Export data
        </Button>
      </Toolbar>
    </AppBar>
  )
}


const regions = [
  {value: "1", name: "Europe"},
  {value: "2", name: "Middle East"},
  {value: "3", name: "Asia"},
  {value: "4", name: "Africa"},
  {value: "5", name: "Americas"},
]
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
