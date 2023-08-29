import { ListItem, ListItemText, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { hover } from "@testing-library/user-event/dist/hover";

function ListItmeContainer(props) {
  const handleClick = (index) => {
    console.log(index + " delete!");
    console.log(props.item.habitType);
    props.deleteHabitHandler(props.item.habitId, props.item.habitType);
  };

  return (
    <ListItem
      key={props.index}
      sx={{
        backgroundColor: props.background,
        borderRadius: 10,
        marginBottom: 2,
        height: 35,
        border: "1px solid black",
      }}
    >
      <ListItemText sx={{ color: "white", fontWeight: 400 }}>
        <Typography fontSize={14} fontWeight={"bold"}>
          {props.index + 1 + ". " + props.item.content}
        </Typography>
      </ListItemText>
      <IconButton
        onClick={() => handleClick(props.item.habitId)}
        size="small"
        sx={{
          transition: "background-color 0.3s", // 변화를 부드럽게 만들기 위한 트랜지션 설정
          "&:hover": {
            backgroundColor: "#dbe5ebe5", // hover 시 배경색 변경
            opacity: 0.8,
            color: "black",
          },
        }}
      >
        <Delete
          sx={{
            fontSize: 20,
            color: "white",
            transition: "background-color 0.3s", // 변화를 부드럽게 만들기 위한 트랜지션 설정
            "&:hover": {
              color: "black", // hover 시 배경색 변경
            },
          }}
        />
      </IconButton>
    </ListItem>
  );
}

export default ListItmeContainer;
