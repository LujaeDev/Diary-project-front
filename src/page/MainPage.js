import * as React from "react";

import SideBar from "../components/SideBar";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HabitList from "../components/HabitList";
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e3eaf0",
      main: "#2743cc",
      dark: "#3937b6",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    item: {
      light: "#3e7af2",
      main: "#4e43e7",
    },
    title: {
      negative: "#f80000",
      positive: "#0092f3",
    },
  },
});

function MainPage() {
  const [listPositiveHabits, setListPositiveHabits] = useState([]);
  const [listNegativeHabits, setListNegativeHabits] = useState([]);

  const drawer = <SideBar title="Home" />;
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const drawerWidth = 250;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    // Axios GET 요청 보내기

    axios
      .get("/api/main")
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);
        setListPositiveHabits(response.data.data.positiveHabits);
        setListNegativeHabits(response.data.data.negativeHabits);

        console.log(listPositiveHabits);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  }, []);

  const addHabitHandler = (content, habitType) => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    const formData = {
      content: content,
      habitType: habitType,
    };

    const setListHabits =
      habitType === "positive" ? setListPositiveHabits : setListNegativeHabits;
    const listHabits =
      habitType === "positive" ? listPositiveHabits : listNegativeHabits;

    axios
      .post("/api/habits", formData)
      .then((response) => {
        // 성공적인 응답 처리
        setListHabits([...listHabits, response.data]);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);
      });
  };

  const deleteHabitHandler = (habitId, habitType) => {
    console.log("haibtId = " + habitId + ", habitType = " + habitType);

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    const setListHabits =
      habitType === "positive" ? setListPositiveHabits : setListNegativeHabits;
    const listHabits =
      habitType === "positive" ? listPositiveHabits : listNegativeHabits;

    axios
      .delete(`/api/habits/${habitId}`)
      .then((response) => {
        // 성공적인 응답 처리
        const updatedList = listHabits.filter(
          (item) => item.habitId !== habitId
        );
        setListHabits(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "white",
          color: "black",
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
          <Typography variant="h3" noWrap component="div">
            Home
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Avatar
            sx={{ width: "75px", height: "75px", AspectRatio: "1/1", mr: 5 }}
            alt="youjae"
            src={require("../images/avatar/a1.jpg")}
          />
          <TextField
            id="introduce"
            label="introduce"
            variant="outlined"
            multiline
            rows={2}
            sx={{ width: "70%", height: "100%" }}
          />
        </Box>

        <BoxRowStyle>
          <ThemeProvider theme={theme}>
            <HabitList
              habitType="positive"
              title="Positive habits"
              titleColor="title.positive"
              subheader="add your habits to keep"
              background="primary.light"
              itemBackground="item.light"
              listItems={listPositiveHabits}
              addHabitHandler={addHabitHandler}
              deleteHabitHandler={deleteHabitHandler}
            />

            <HabitList
              habitType="negative"
              title="Negative habits"
              titleColor="title.negative"
              subheader="add your habits of discarding"
              background="primary.light"
              itemBackground="item.light"
              listItems={listNegativeHabits}
              addHabitHandler={addHabitHandler}
              deleteHabitHandler={deleteHabitHandler}
            />
          </ThemeProvider>
        </BoxRowStyle>
      </Box>
    </Box>
  );
}

export default MainPage;
