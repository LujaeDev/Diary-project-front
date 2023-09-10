import SideBar from "../components/SideBar";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "@emotion/styled";
import { Menu, TextField } from "@mui/material";
import MonthlyGoalContainer from "../components/MonthlyGoalContainer";
import MonthlyGoalCard from "../components/MonthlyGoalCard";
import moment from "moment";
import dayjs from "dayjs";

function MonthlyGoalPage() {
  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
  });

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const setDateHandler = (date) => {
    setSelectedDate(date);
  };

  const [monthlyGoalList, setMonthlyGoalList] = React.useState([]);
  const [rootGoalList, setRootGoalList] = useState([]);
  const [selectdRootGoal, setSelectdRootGoal] = useState(1);

  const convertToStringDate = (date) => {
    const year = date.year(); // 연도 추출
    const month = String(date.month() + 1).padStart(2, "0"); // 월 추출 (0부터 시작하므로 1을 더해줍니다)
    const day = String(date.date()).padStart(2, "0"); // 일 추출

    const formattedDate = `${year}-${month}-${day}`; // 원하는 형식으로 문자열 생성

    return formattedDate;
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectdRootGoal(event.target.value);
  };

  const addGoalHandler = (goalContent) => {
    const rootGoal = selectdRootGoal;

    const formData = {
      content: goalContent,
      parentGoalId: rootGoal,
      date: selectedDate,
      completed: false,
    };

    console.log(formData);
    let uri = "/api/monthlyGoals";
    axios
      .post(uri, formData)
      .then((response) => {
        // 성공적인 응답 처리
        setMonthlyGoalList([...monthlyGoalList, response.data]);
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

  const deleteGoalHandler = (goalId) => {
    console.log("goalId = " + goalId);

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    axios
      .delete(`/api/monthlyGoals/${goalId}`)
      .then((response) => {
        // 성공적인 응답 처리
        const updatedList = monthlyGoalList.filter(
          (item) => item.monthlyGoalId !== goalId
        );

        setMonthlyGoalList(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);
      });
  };

  const checkHandler = (id) => {
    let uri = `/api/monthlyGoals/${id}/completed`;
    const encodedURI = encodeURI(uri);

    console.log(monthlyGoalList);
    const objGoal = monthlyGoalList.filter((goal) => {
      return goal.monthlyGoalId === id;
    });

    const updateRequest = {
      completed: !objGoal[0].completed,
    };

    axios
      .patch(encodedURI, updateRequest, {
        headers: { Accept: "application/json" },
      })
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);

        const updatedList = monthlyGoalList.map((goal) => {
          if (goal.monthlyGoalId === id)
            return { ...goal, completed: !goal.completed };
          else return goal;
        });

        console.log(updatedList);
        setMonthlyGoalList(updatedList);
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

  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    // Axios GET 요청 보내기

    //리스트 목록 가져오기
    const year = selectedDate.$y;
    let uri = "/api/annualGoals/" + year;
    const encodedURI1 = encodeURI(uri);
    axios
      .get(encodedURI1, { headers: { Accept: "application/json" } })
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);
        setRootGoalList(response.data.annualGoalResponseList);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });

    uri =
      "/api/monthlyGoals/rootGoal/" +
      selectdRootGoal +
      "/date/" +
      convertToStringDate(selectedDate);
    const encodedURI2 = encodeURI(uri);

    axios
      .get(encodedURI2, { headers: { Accept: "application/json" } })
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);
        setMonthlyGoalList(response.data.monthlyGoalResponseList);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  }, [selectedDate, selectdRootGoal]);

  const content = (
    <div>
      <BoxRowStyle>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              views={["year"]}
              label={"Select year"}
              onChange={setDateHandler}
              value={selectedDate}
              inputFormat="yyyy"
              sx={{ width: 20 }}
            />
            <DatePicker
              views={["month"]}
              label={"Select month"}
              value={selectedDate}
              onChange={setDateHandler}
              sx={{ width: 20 }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <FormControl sx={{ m: 1, minWidth: 500, marginLeft: 12 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Select root Goal
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectdRootGoal}
            onChange={handleChange}
            //autoWidth
            label="Select root Goal"
            sx={{ width: "100%" }}
          >
            {rootGoalList.map((item, index) => {
              return (
                <MenuItem key={index} value={item.annualGoalId}>
                  {item.content}
                </MenuItem>
              );
            })}
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
      </BoxRowStyle>
      <MonthlyGoalCard
        listGoals={monthlyGoalList}
        goalType="Monthly Goal"
        addHandler={addGoalHandler}
        deleteHandler={deleteGoalHandler}
        checkHandler={checkHandler}
      />
    </div>
  );

  return <SideBar title="Monthly Goal" content={content} />;
}

export default MonthlyGoalPage;
