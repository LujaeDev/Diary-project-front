import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import styled from "@emotion/styled";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function TodoList(props) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addHandler = () => {
    if (taskText.trim() === "") return;

    props.handleAddTask(taskText);
    setTaskText("");
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Box sx={props.sx}>
      <StyledHorizontalContainer>
        <TextField
          label="Task"
          variant="outlined"
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          sx={{ marginRight: 4 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addHandler}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Task
        </Button>
      </StyledHorizontalContainer>
      <List>
        {props.taskList.map((task, index) => (
          <div>
          <ListItem key={index}>
            <Checkbox {...label} />
            <ListItemText primary={index + 1 + ". " + task.content} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(index)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}

export default TodoList;
