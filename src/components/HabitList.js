import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import CardHeader from "@mui/material/CardHeader";

import ListItmeContainer from "./ListItemContainer";
import { styled } from "@mui/system";

const BoxRowStyle = styled("div")({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

function HabitList(props) {
  const [inputValue, setInputValue] = useState("");
  //const [listItems, setListItems] = useState([]);

  const listItems = props.listItems;
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() === "") return;

    props.addHabitHandler(inputValue, props.habitType);
    //setListItems([...listItems, inputValue]);
    setInputValue("");
  };

  return (
    <Card
      sx={{ minWidth: 400, maxWidth: 500, border: "1px solid black" }}
      variant="outlined"
    >
      <CardContent>
        <CardHeader
          title={
            <Typography variant="h4" fontWeight="bold">
              {props.title}
            </Typography>
          }
          subheader={props.subheader}
          sx={{ color: props.titleColor, fontWeight: "bold" }}
        />
        <div>
          <Card
            variant="outlined"
            sx={{ marginBottom: 4, border: "1px solid black" }}
          >
            <CardContent>
              <List>
                {listItems.map((item, index) => (
                  <ListItmeContainer
                    item={item}
                    index={index}
                    background={props.itemBackground}
                    deleteHabitHandler={props.deleteHabitHandler}
                    key={index}
                  />
                ))}
              </List>
            </CardContent>
          </Card>

          <BoxRowStyle>
            <TextField
              label="Add an item"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
              backgroundColor="white"
            />
            <Button variant="contained" onClick={handleAddItem}>
              Add
            </Button>
          </BoxRowStyle>
        </div>
      </CardContent>
    </Card>
  );
}

export default HabitList;
