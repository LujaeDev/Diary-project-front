import GoalCard from "../components/GoalCard";
import SideBar from "../components/SideBar";
import { styled } from "@mui/system";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

function AnnualGoalPage() {
  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        <GoalCard title="Career" />
        <GoalCard title="Health" />
      </BoxRowStyle>

      <BoxRowStyle sx={{ marginTop: 8 }}>
        <GoalCard title="Family" />
        <GoalCard title="Finance" />
      </BoxRowStyle>
    </div>
  );

  return (
    <div>
      <SideBar title="AnnualGoal" content={content} />
    </div>
  );
}

export default AnnualGoalPage;
