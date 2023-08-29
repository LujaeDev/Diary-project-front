import { ListItem, ListItemText, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/system";

function AnnualGoalContainer(props) {
  const BoxRowStyle = styled("div")({
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  });

  const handleClick = (goalId) => {
    console.log("click category: " + props.item.category);
    console.log("click goalId: " + goalId);

    props.deleteHandler(props.item.category, goalId);
  };

  return (
    <div>
      <BoxRowStyle>
        <ListItem
          key={props.index}
          sx={{
            borderRadius: 10,
            height: 32,
          }}
        >
          <ListItemText sx={{ fontWeight: 400 }}>
            <Typography fontSize={14} fontWeight={"bold"}>
              {props.index + 1 + ". " + props.item.content}
            </Typography>
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
            onClick={() => handleClick(props.item.annualGoalId)}
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

export default AnnualGoalContainer;
