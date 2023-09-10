import { ListItem, ListItemText, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";

// 스타일을 정의하는 StyledTypography 컴포넌트
const StyledTypography = styled(Typography)`
  text-decoration: ${(props) => props.textDecoration};
`;

function MonthlyGoalContainer(props) {
  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  });

  const handleClick = (goalId) => {
    console.log("click goalId: " + goalId);

    props.deleteHandler(goalId);
  };

  const handleCheck = (goalId) => {
    console.log("check goalId: " + goalId);

    props.checkHandler(goalId);
  };

  return (
    <div style={{ marginBottom: 4 }}>
      <BoxRowStyle>
        <ListItem
          key={props.index}
          sx={{
            borderRadius: 10,
            height: 32,
          }}
        >
          <Checkbox
            onClick={() => handleCheck(props.item.monthlyGoalId)}
            checked={props.item.completed}
          />
          <ListItemText sx={{ fontWeight: 400 }}>
            <StyledTypography
              fontSize={14}
              fontWeight={"bold"}
              textDecoration={props.item.completed ? "line-through" : "none"}
            >
              {props.index + 1 + ". " + props.item.content}
            </StyledTypography>
          </ListItemText>
          <IconButton
            size="small"
            sx={{
              transition: "background-color 0.3s", // 변화를 부드럽게 만들기 위한 트랜지션 설정
              "&:hover": {
                backgroundColor: "#dbe5ebe5", // hover 시 배경색 변경
                opacity: 0.8,
                color: "black",
              },
            }}
            onClick={() => handleClick(props.item.monthlyGoalId)}
          >
            <Delete
              sx={{
                fontSize: 20,
                color: "Black",
                transition: "background-color 0.3s", // 변화를 부드럽게 만들기 위한 트랜지션 설정
                "&:hover": {
                  color: "black", // hover 시 배경색 변경
                },
              }}
            />
          </IconButton>
        </ListItem>
      </BoxRowStyle>

      <Divider sx={{ backgroundColor: "#b6bbc0" }} />
    </div>
  );
}

export default MonthlyGoalContainer;
