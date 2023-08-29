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
import AnnualGoalContainer from "./AnnualGoalContainer";

const BoxRowStyle = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

function GoalCard(props) {
  const [listGoals, setListGoals] = useState([]);
  const [inputText, setInputText] = useState("");

  const addHandler = () => {
    console.log(listGoals);
    setListGoals([...listGoals, inputText]);
    console.log(listGoals);
    setInputText("");
  };

  const changeTextHandler = (event) => {
    setInputText(event.target.value);
  };

  return (
    <Card
      sx={{
        minWidth: 400,
        maxWidth: 500,
        border: "1px solid black",
        borderRadius: 8,
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Annual Goal
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          {props.title}
        </Typography>

        <List>
          {listGoals.map((item, index) => (
            <AnnualGoalContainer item={item} index={index} key={index} />
          ))}
        </List>

        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <BoxRowStyle>
          <TextField
            variant="standard"
            value={inputText}
            sx={{ width: "70%", height: "20%" }}
            label="Annual Goal"
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
      </CardContent>
    </Card>
  );
}

export default GoalCard;
