import {Drawer, ListItemIcon, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";
import React from "react";
import {drawerWidth, selectorHeight, topBarHeight} from "~/const/layout-consts";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BoltIcon from '@mui/icons-material/Bolt';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

export default function PageNavigation() {

  function scrollToWithOffset(id: string, offset: number = selectorHeight + topBarHeight) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({top, behavior: 'smooth'});
    }
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          top: 64, // height of AppBar
        },
      }}
    >
      <Typography variant={"h6"} sx={{p: 1}}>Graphs</Typography>
      <MenuList>
        <MenuItem onClick={() => scrollToWithOffset("energy-graph")}>
          <ListItemIcon>
            <BoltIcon/>
          </ListItemIcon>
          <ListItemText>Energy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => scrollToWithOffset("food-graph")}>
          <ListItemIcon>
            <FastfoodIcon/>
          </ListItemIcon>
          <ListItemText>Food</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => scrollToWithOffset("metal-graph")}>
          <ListItemIcon>
            <ViewColumnIcon/>
          </ListItemIcon>
          <ListItemText>Metals</ListItemText>
        </MenuItem>
      </MenuList>
    </Drawer>
  )
}