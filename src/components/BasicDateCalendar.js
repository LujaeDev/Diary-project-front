import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import dayjs from "dayjs";

export default function BasicDateCalendar(props) {
  return (
    <Box sx={props.sx}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={props.date} onChange={props.changeHandler} />
      </LocalizationProvider>
    </Box>
  );
}
