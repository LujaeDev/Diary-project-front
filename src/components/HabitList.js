import React, { useState } from "react";
import { Button, List, ListItem, TextField } from "@mui/material";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import CardHeader from "@mui/material/CardHeader";

import ListItmeContainer from "./ListItemContainer";
import { styled } from "@mui/system";

const BoxRowStyle = styled("Box")({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
});

function HabitList(props) {
  const [inputValue, setInputValue] = useState("");
  const [listItems, setListItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setListItems([...listItems, inputValue]);
      setInputValue("");
    }
  };

  return (
    <Card
      sx={{ minWidth: 400, maxWidth: 500, backgroundColor: props.background }}
      variant="outlined"
    >
      <CardContent>
        <CardHeader
          title={props.title}
          subheader={props.subheader}
          sx={{ color: props.titleColor }}
        />
        <div>
          <Card variant="outlined" sx={{ marginBottom: 4 }}>
            <CardContent>
              <List>
                {listItems.map((item, index) => (
                  <ListItmeContainer
                    item={item}
                    index={index}
                    background={props.itemBackground}
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
