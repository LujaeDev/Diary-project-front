import SideBar from "../components/SideBar";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import AddDiaryModal from "../components/AddDiaryModal";
import ViewDiaryModal from "../components/ViewDiaryModal";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DiaryPage() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [date, setDate] = useState(dayjs());
  const defaultTheme = createTheme();
  const [addDiaryModalOpen, setAddDiaryModalOpen] = useState(false);
  const [viewDiaryModalOpen, setViewDiaryModalOpen] = useState(false);
  const [selectedDiaryId, setselectedDiaryId] = useState();

  const [diariesList, setDiariesList] = useState([]);
  const navigate = useNavigate();

  const convertToStringDate = (date) => {
    const year = date.year(); // 연도 추출
    const month = String(date.month() + 1).padStart(2, "0"); // 월 추출 (0부터 시작하므로 1을 더해줍니다)
    const day = String(date.date()).padStart(2, "0"); // 일 추출

    const formattedDate = `${year}-${month}-${day}`; // 원하는 형식으로 문자열 생성

    console.log(formattedDate);
    return formattedDate;
  };

  const setDateHandler = (d) => {
    setDate(d);
  };

  const openAddModalHandler = () => {
    setAddDiaryModalOpen(true);
  };

  const openViewModalHandler = (diaryId) => {
    console.log("diaryId = " + diaryId);

    setselectedDiaryId(diaryId);
    setViewDiaryModalOpen(true);
  };

  const closeAddModalHandler = () => {
    setAddDiaryModalOpen(false);
  };

  const closeViewModalHandler = () => {
    setViewDiaryModalOpen(false);
  };

  const addDiaryHandler = (diaryTitle, diaryContent) => {
    const formData = {
      title: diaryTitle,
      content: diaryContent,
      date: date,
    };

    console.log(formData);
    const uri = "/api/diaries";
    axios
      .post(uri, formData)
      .then((response) => {
        // 성공적인 응답 처리
        setDiariesList([...diariesList, response.data]);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  };

  const deleteHandler = (diaryId) => {
    const uri = "/api/diaries/" + diaryId;
    axios
      .delete(uri)
      .then((response) => {
        // 성공적인 응답 처리

        const updatedList = diariesList.filter(
          (item) => item.diaryId !== diaryId
        );

        setDiariesList(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  };

  const updateDiaryHandler = (diaryTitle, diaryContent) => {
    const updatedData = {
      title: diaryTitle,
      content: diaryContent,
    };

    const uri = "/api/diaries/" + selectedDiaryId;

    axios
      .patch(uri, updatedData)
      .then((response) => {
        // 성공적인 응답 처리

        const updatedList = [...diariesList];

        for (let i = 0; i < diariesList.length; ++i) {
          if (diariesList[i].diaryId === selectedDiaryId) {
            updatedList[i].title = diaryTitle;
            updatedList[i].content = diaryContent;
          }
        }

        setDiariesList(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    console.log(localStorage.getItem("token"));
    // Axios GET 요청 보내기

    const uri = "/api/diaries/" + "/date/" + convertToStringDate(date);
    const encodedURI = encodeURI(uri);

    axios
      .get(encodedURI)
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);
        setDiariesList(response.data.diaryResponseList);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  }, [date]);

  const content = (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="MM/DD/YYYY" value={date} onChange={setDateHandler} />
      </LocalizationProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Diary layout
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained" onClick={openAddModalHandler}>
                  Record daily life
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {diariesList.map((diary) => (
                <Grid item key={diary.diaryId} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="h2">
                        {diary.title}
                      </Typography>
                      <Typography
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3, // 표시할 최대 줄 수를 지정하세요
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-all",
                        }}
                      >
                        {diary.content}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => openViewModalHandler(diary.diaryId)}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={() => deleteHandler(diary.diaryId)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
      {addDiaryModalOpen && (
        <AddDiaryModal
          closeHandler={closeAddModalHandler}
          addDiaryHandler={addDiaryHandler}
        />
      )}
      {viewDiaryModalOpen && (
        <ViewDiaryModal
          diaryId={selectedDiaryId}
          closeHandler={closeViewModalHandler}
          updateDiaryHandler={updateDiaryHandler}
        />
      )}
    </div>
  );

  return (
    <div>
      <SideBar title="Diary" content={content} />
    </div>
  );
}

export default DiaryPage;

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
