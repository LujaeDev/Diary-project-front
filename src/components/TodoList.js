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

const StyledHorizontalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function TodoList(props) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      setTasks([...tasks, taskText]);
      setTaskText("");
    }
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
          onClick={handleAddTask}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Task
        </Button>
      </StyledHorizontalContainer>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
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
        ))}
      </List>
    </Box>
  );
}

export default TodoList;
