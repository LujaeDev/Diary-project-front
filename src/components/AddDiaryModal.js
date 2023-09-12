import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function AddDiaryModal(props) {
  const modalWidth = 500;
  const [open, setOpen] = useState(true);
  const [diaryTitle, setDiaryTitle] = useState(""); //일기 제목
  const [diaryContent, setDiaryContet] = useState("");

  const [scroll, setScroll] = React.useState("paper");

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;

    console.log("here");
    props.closeHandler();
    setOpen(false);
  };

  const handleChangeTitle = (event) => {
    setDiaryTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setDiaryContet(event.target.value);
  };

  const handleAddDiary = () => {
    props.addDiaryHandler(diaryTitle, diaryContent);
    props.closeHandler();
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    console.log("open: " + open);

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" sx={{ width: modalWidth }}>
          <TextField
            id="standard-textarea"
            label="Title"
            placeholder="Title"
            variant="standard"
            fullWidth
            onChange={handleChangeTitle}
          />
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"} sx={{ width: modalWidth }}>
          <TextField
            id="standard-multiline-static"
            label="Content"
            multiline
            fullWidth
            rows={25}
            placeholder="Content"
            variant="standard"
            onChange={handleChangeContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDiary}>add</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
