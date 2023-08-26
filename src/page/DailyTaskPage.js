import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";
import BasicDateCalendar from "../components/BasicDateCalendar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function currentDate() {
  var ret = new Date();

  var year = ret.getFullYear();
  var month = String(ret.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  var day = String(ret.getDate()).padStart(2, "0");

  // yyyy-mm-dd 형식으로 포맷팅
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
}

function DailyTaskPage() {
  const date = currentDate();
  const [taskList, setTaskList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    // Axios GET 요청 보내기

    let uri = "/api/tasks?date=" + date;
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
  }, []);

  const handleAddTask = (taskContent) => {
    const date = currentDate();
    const formData = {
      content: taskContent,
      success: false,
      startTime: null,
      endTime: null,
      date: date,
    };

    console.log(formData);
    let uri = "/api/tasks";
    axios
      .post(uri, formData)
      .then((response) => {
        // 성공적인 응답 처리
        setTaskList([...taskList, formData]);
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

  const content = (
    <StyledHorizontalContainer>
      <BasicDateCalendar sx={{ flex: "2 1 0" }} />
      <TodoList
        sx={{ flex: "3 1 0", marginTop: 4 }}
        handleAddTask={handleAddTask}
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
