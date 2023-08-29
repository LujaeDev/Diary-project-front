import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";
import BasicDateCalendar from "../components/BasicDateCalendar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import dayjs from "dayjs";

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
`;

function DailyTaskPage() {
  const [date, setDate] = useState(dayjs());
  const [taskList, setTaskList] = useState([]);

  const navigate = useNavigate();

  const convertToStringDate = (date) => {
    const year = date.year(); // 연도 추출
    const month = String(date.month() + 1).padStart(2, "0"); // 월 추출 (0부터 시작하므로 1을 더해줍니다)
    const day = String(date.date()).padStart(2, "0"); // 일 추출

    const formattedDate = `${year}-${month}-${day}`; // 원하는 형식으로 문자열 생성

    return formattedDate;
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    // Axios GET 요청 보내기

    let uri = "/api/tasks?date=" + convertToStringDate(date);
    const encodedURI = encodeURI(uri);
    axios
      .get(encodedURI, { headers: { Accept: "application/json" } })
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);
        setTaskList(response.data.taskList);
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

  const addTaskHandler = (taskContent) => {
    const stringDate = convertToStringDate(date);
    const formData = {
      content: taskContent,
      success: false,
      startTime: null,
      endTime: null,
      date: stringDate,
    };

    console.log(formData);
    let uri = "/api/tasks";
    axios
      .post(uri, formData)
      .then((response) => {
        // 성공적인 응답 처리
        setTaskList([...taskList, response.data]);
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

  const dateChangeHanlder = (inputDate) => {
    setDate(inputDate);
  };

  const deleteTaskHandler = (taskId) => {
    console.log("taskId = " + taskId);

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    axios
      .delete(`/api/tasks/${taskId}`)
      .then((response) => {
        // 성공적인 응답 처리
        const updatedList = taskList.filter((item) => item.taskId !== taskId);

        setTaskList(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);
      });
  };

  const content = (
    <StyledHorizontalContainer>
      <Card variant="outlined" sx={{ flex: "2 1 0", marginTop: 4 }}>
        <BasicDateCalendar value={date} changeHandler={dateChangeHanlder} />
      </Card>
      <TodoList
        sx={{ flex: "3 1 0", marginTop: 4, marginLeft: 4 }}
        handleAddTask={addTaskHandler}
        handleDeleteTask={deleteTaskHandler}
        taskList={taskList}
      />
    </StyledHorizontalContainer>
  );

  return (
    <div>
      <SideBar title="DailyTask" content={content} />
    </div>
  );
}

export default DailyTaskPage;
