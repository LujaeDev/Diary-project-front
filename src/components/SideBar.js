import * as React from "react";

import AppBar from "@mui/material/AppBar";

import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import Drawer from "@mui/material/Drawer";

import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { Link, Navigate } from "react-router-dom";
import { Container } from "@mui/material";

const drawerWidth = 250;

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
  const [open, setOpen] = React.useState(true);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const hanldeHomeBtn = () => {
    console.log("home btn");
    return <Navigate to="/main" />;
  };

  const listItems = [
    { icon: <Home />, primary: "Home", ref: "/main" },
    {
      icon: <PlaylistAddCheckIcon />,
      primary: "Daily task",
      ref: "/dailyTask",
    },
    {
      icon: <StarIcon />,
      primary: "Goal",
      nestedItems: [
        { icon: <StarBorderPurple500TwoToneIcon />, primary: "Weekly Goal" },
        {
          icon: <StarBorderPurple500TwoToneIcon />,
          primary: "Monthly Goal",
          ref: "/monthlyGoal",
        },
        {
          icon: <StarBorderPurple500TwoToneIcon />,
          primary: "Annual Goal",
          ref: "/annualGoal",
        },
      ],
    },
    { icon: <ModeIcon />, primary: "Diary" },
    { icon: <CalendarMonthIcon />, primary: "Calendar" },
  ];

  const drawer = (
    <div style={{ height: "100%" }}>
      <AppBar position="static" color="primary">
        {appBarLabel("Mind Archvive")}
      </AppBar>
      <Divider />
      <List>
        {listItems.map((item, index) => (
          <div key={index}>
            <Link
              to={item.ref}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ListItemButton
                onClick={item.nestedItems ? handleClick : item.btnNavigate}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.primary} />
                {item.nestedItems && (open ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </Link>

            {item.nestedItems && (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                    <Link
                      to={nestedItem.ref}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      <ListItemButton key={nestedIndex} sx={{ pl: 4 }}>
                        <ListItemIcon>{nestedItem.icon}</ListItemIcon>
                        <ListItemText primary={nestedItem.primary} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container>{props.content}</Container>
      </Box>
    </Box>
  );
}

export default SideBar;
