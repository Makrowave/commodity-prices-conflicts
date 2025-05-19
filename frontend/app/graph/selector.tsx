import {
  AppBar, Box, Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  Toolbar
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type {ConflictQuery} from "~/const/dto";
import {drawerWidth, topBarHeight} from "~/const/layout-consts";

type SelectorProps = {
  updateQuery: (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => void;
  query: ConflictQuery;
};


export default function Selector({updateQuery, query}: SelectorProps) {

  const handleChange = (event: SelectChangeEvent<typeof query.regions>) => {
    const {
      target: { value },
    } = event;
    updateQuery(
      "regions",
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <AppBar position="fixed" sx={{zIndex: 10, marginTop: `${topBarHeight}px`, paddingLeft: `${drawerWidth}px`, bgcolor: "white"}}>
      <Toolbar sx={{zIndex: 10, py: 2}}>
        <DatePicker sx={{mx: 1}} label={"Od"} views={['year', 'month']} value={query.from} onChange={(value) => updateQuery("from", value!)} />
        <DatePicker sx={{mx: 1}} label={"Do"} views={['year', 'month']} value={query.to} onChange={(value) => updateQuery("to", value!)} />
        <FormControl sx={{mx: 1, width: 500}} >
          <InputLabel id="region-select">Regiony</InputLabel>
          <Select
            labelId="region-select"
            MenuProps={MenuProps}
            multiple
            onChange={handleChange}
            value={query.regions}
            input={<OutlinedInput id="region-select" label="Regiony" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={regions.find(r => (r.value === value))!.name} />
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
      </Toolbar>
    </AppBar>
  )
}


const regions = [
  {value: "1", name: "Europa"},
  {value: "2", name: "Bliski wschód"},
  {value: "3", name: "Azja"},
  {value: "4", name: "Afryka"},
  {value: "5", name: "Ameryki"},
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
