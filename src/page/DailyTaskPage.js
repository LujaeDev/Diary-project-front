import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";
import BasicDateCalendar from "../components/BasicDateCalendar";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
`;

function DailyTaskPage() {
  const content = (
    <StyledHorizontalContainer>
      <BasicDateCalendar sx={{ flex: "1 1 0" }} />
      <TodoList sx={{ flex: "3 1 0", marginTop: 4 }} />
    </StyledHorizontalContainer>
  );
  return (
    <div>
      <SideBar title="DailyTask" content={content} />
    </div>
  );
}

export default DailyTaskPage;
