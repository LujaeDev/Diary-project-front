import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { ListItem, ListItemText } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton } from "@mui/material";

function handleClick() {
  console.log("delete!");
}

function ListItmeContainer(props) {
  return (
    <ListItem
      key={props.index}
      sx={{
        backgroundColor: props.background,
        borderRadius: 10,
        marginBottom: 2,
      }}
    >
      <ListItemText primary={props.item}></ListItemText>
      <IconButton onClick={handleClick} size="small">
        <RemoveCircleOutlineIcon />
      </IconButton>
    </ListItem>
  );
}

export default ListItmeContainer;
