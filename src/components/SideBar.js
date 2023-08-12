import * as React from "react";

import AppBar from "@mui/material/AppBar";

import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "@mui/icons-material/Home";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import StarIcon from "@mui/icons-material/Star";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModeIcon from "@mui/icons-material/Mode";

function appBarLabel(label) {
  return (
    <Toolbar>
      <CollectionsBookmarkIcon sx={{ mr: "24px" }} />

      <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function SideBar(props) {
  const icons = [
    <Home />,
    <PlaylistAddCheckIcon />,
    <StarIcon />,
    <ModeIcon />,
    <CalendarMonthIcon />,
  ];

  const drawer = (
    <div style={{ height: "100%" }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          {appBarLabel("Mind Archvive")}
        </AppBar>
      </ThemeProvider>
      <Divider />
      <List>
        {["Home", "Daily task", "Goal", "Diary", "Calendar"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </div>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  return drawer;
}

export default SideBar;
