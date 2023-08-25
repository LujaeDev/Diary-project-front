import { ListItem, ListItemText } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";

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
      <ListItemText
        primary={props.index + 1 + ". " + props.item.content}
      ></ListItemText>
      <IconButton onClick={() => handleClick(props.item.habitId)} size="small">
        <RemoveCircleOutlineIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </ListItem>
  );
}

export default ListItmeContainer;
