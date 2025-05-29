import {
  AppBar, Box, Button, Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
  Toolbar
} from "@mui/material";
import yaml from "yaml";
import {js2xml} from "xml-js";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import type {CommoditiesInMonth, Conflict, ConflictQuery} from "~/const/models";
import {drawerWidth, topBarHeight} from "~/const/layout-consts";
import {energyKeyLabels, foodKeyLabels, metalKeyLabels} from "~/const/labels";
import {useState, type MouseEvent} from "react";

type SelectorProps = {
  updateQuery: (key: keyof ConflictQuery, value: ConflictQuery[keyof ConflictQuery]) => void;
  query: ConflictQuery;
  conflicts: Conflict[];
  commodities: CommoditiesInMonth[];
};

const handleDownload = (
  conflicts: Conflict[],
  commodities: CommoditiesInMonth[],
  format: "json" | "yaml" | "xml"
) => {
  const content = {
    conflicts,
    commodities,
    labels: [...foodKeyLabels, ...energyKeyLabels, ...metalKeyLabels],
  };

  let string = "";
  let mimeType = "";

  if (format === "yaml") {
    string = encodeURIComponent(yaml.stringify(content));
    mimeType = "text/yaml";
  } else if (format === "json") {
    string = encodeURIComponent(JSON.stringify(content, null, 2));
    mimeType = "application/json";
  } else if (format === "xml") {
    const xmlData = js2xml({export: content}, {compact: true, spaces: 2});
    string = encodeURIComponent(xmlData);
    mimeType = "application/xml";
  }

  const link = document.createElement("a");
  link.href = `data:${mimeType};charset=utf-8,${string}`;
  link.download = `data.${format}`;
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{width: "200px"}}
          >
            Export data
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              sx={{width: "200px", justifyContent: "center"}}
              onClick={() => {
                handleDownload(conflicts, commodities, "json");
                handleClose();
              }}
            >
              json
            </MenuItem>
            <MenuItem
              sx={{width: "200px", justifyContent: "center"}}
              onClick={() => {
                handleDownload(conflicts, commodities, "yaml");
                handleClose();
              }}
            >
              yaml
            </MenuItem>
            <MenuItem
              sx={{width: "200px", justifyContent: "center"}}
              onClick={() => {
                handleDownload(conflicts, commodities, "xml");
                handleClose();
              }}
            >
              xml
            </MenuItem>
          </Menu>
        </div>

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
