import GoalCard from "../components/GoalCard";
import SideBar from "../components/SideBar";
import { styled } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";

function AnnualGoalPage() {
  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  });

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [careerList, setCarrerList] = useState([]);
  const [healthList, setHealthList] = useState([]);
  const [familyList, setFamilyList] = useState([]);
  const [financeList, setFinanceList] = useState([]);
  const categoryList = [
    { category: "career", list: careerList, setList: setCarrerList },
    { category: "health", list: healthList, setList: setHealthList },
    { category: "family", list: familyList, setList: setFamilyList },
    { category: "finance", list: financeList, setList: setFinanceList },
  ];

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    // Axios GET 요청 보내기

    console.log(selectedDate);
    categoryList.map((item) => {
      const category = item.category;
      const setList = item.setList;

      const year =
        selectedDate instanceof moment ? selectedDate.year() : selectedDate.$y;
      let uri = "/api/annualGoals/" + year + "/" + category;
      const encodedURI = encodeURI(uri);
      axios
        .get(encodedURI, { headers: { Accept: "application/json" } })
        .then((response) => {
          // 성공적인 응답 처리
          console.log("Response:", response.data);
          setList(response.data.annualGoalResponseList);
        })
        .catch((error) => {
          // 에러 핸들링 및 로그인 페이지로 리디렉션
          console.error("Error: ", error);

          if (error.response && error.response.status === 401) {
            // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
            navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
          }
        });
    });
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addGoalHandler = (goalCategory, goalContent) => {
    const year =
      selectedDate instanceof moment ? selectedDate.year() : selectedDate.$y;

    const categoryObj = categoryList.filter((item) => {
      return item.category === goalCategory;
    })[0];

    const formData = {
      content: goalContent,
      category: goalCategory,
      year: year,
    };

    console.log(formData);
    let uri = "/api/annualGoals";
    axios
      .post(uri, formData)
      .then((response) => {
        // 성공적인 응답 처리
        categoryObj.setList([...categoryObj.list, response.data]);
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

  const deleteGoalHandler = (goalCategory, goalId) => {
    console.log("goalId = " + goalId);

    const categoryObj = categoryList.filter((item) => {
      return item.category === goalCategory;
    })[0];

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");

    axios
      .delete(`/api/annualGoals/${goalId}`)
      .then((response) => {
        // 성공적인 응답 처리
        const updatedList = categoryObj.list.filter(
          (item) => item.annualGoalId !== goalId
        );

        categoryObj.setList(updatedList);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);
      });
  };

  const content = (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            views={["year"]}
            label="Select Year"
            value={selectedDate}
            onChange={handleDateChange}
            inputFormat="yyyy"
          />
        </DemoContainer>
      </LocalizationProvider>

      <BoxRowStyle sx={{ marginTop: 4 }}>
        <GoalCard
          listGoals={careerList}
          title="Career"
          addHandler={addGoalHandler}
          deleteHandler={deleteGoalHandler}
          goalType="Annual Goal"
        />
        <GoalCard
          listGoals={healthList}
          title="Health"
          addHandler={addGoalHandler}
          deleteHandler={deleteGoalHandler}
          goalType="Annual Goal"
        />
      </BoxRowStyle>

      <BoxRowStyle sx={{ marginTop: 8 }}>
        <GoalCard
          listGoals={familyList}
          title="Family"
          addHandler={addGoalHandler}
          deleteHandler={deleteGoalHandler}
          goalType="Annual Goal"
        />
        <GoalCard
          listGoals={financeList}
          title="Finance"
          addHandler={addGoalHandler}
          deleteHandler={deleteGoalHandler}
          goalType="Annual Goal"
        />
      </BoxRowStyle>
    </div>
  );

  return (
    <div>
      <SideBar title="Annual Goal" content={content} />
    </div>
  );
}

export default AnnualGoalPage;
