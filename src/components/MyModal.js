import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyModal(props) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  function handleClose() {
    setOpen(false);
    props.handleClose();

    if (props.title === "Success" && props.caller === "SignUpPage")
      navigate("/main");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default MyModal;
