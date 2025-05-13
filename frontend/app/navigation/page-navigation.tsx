import {Drawer, List, ListItem} from "@mui/material";
import React from "react";
import {drawerWidth} from "~/const/layout-consts";

export default function PageNavigation() {
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
      <List>
        <ListItem>Wykresy</ListItem>
      </List>
    </Drawer>
  )
}