import SideBar from "../components/SideBar";
import TodoList from "../components/TodoList";
import BasicDateCalendar from "../components/BasicDateCalendar";
import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import Card from "@mui/material/Card";

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
`;

function DailyTaskPage() {
  const content = (
    <StyledHorizontalContainer>
      <Card
        variant="outlined"
        sx={{
          marginRight: 8,
          marginTop: 4,
          borderRadius: 10,
        }}
      >
        <BasicDateCalendar sx={{ flex: "1 1 0" }} />
      </Card>
      <TodoList sx={{ flex: "3 1 0", marginTop: 4 }} />
    </StyledHorizontalContainer>
  );
  return (
    <Container>
      <SideBar title="DailyTask" content={content} />
    </Container>
  );
}

export default DailyTaskPage;
