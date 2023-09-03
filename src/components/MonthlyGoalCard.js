import * as React from "react";
import {
  Button,
  CardContent,
  CardActions,
  List,
  Box,
  Card,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { useState } from "react";
import MonthlyGoalContainer from "./MonthlyGoalContainer";

const BoxRowStyle = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  marginBottom: 10,
});

function MonthlyGoalCard(props) {
  const [inputText, setInputText] = useState("");

  const addHandler = () => {
    if (inputText.length === 0) return;

    props.addHandler(inputText);
    setInputText("");
  };

  const changeTextHandler = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid grey",
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Monthly Goal
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {props.title}
        </Typography>
        <BoxRowStyle>
          <TextField
            variant="standard"
            value={inputText}
            sx={{ width: "70%", height: "20%" }}
            label="Monthly Goal"
            onChange={changeTextHandler}
          />
          <Button
            variant="contained"
            sx={{ height: "10%" }}
            onClick={addHandler}
          >
            Add
          </Button>
        </BoxRowStyle>

        <List sx={{ height: 400 }}>
          {props.listGoals.map((item, index) => (
            <MonthlyGoalContainer
              item={item}
              index={index}
              key={index}
              deleteHandler={props.deleteHandler}
              checkHandler={props.checkHandler}
            />
          ))}
        </List>

        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
      </CardContent>
    </Card>
  );
}

export default MonthlyGoalCard;
