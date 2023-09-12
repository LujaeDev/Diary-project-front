import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewDiaryModal(props) {
  const modalWidth = 500;
  const [open, setOpen] = useState(true);
  const [diaryTitle, setDiaryTitle] = useState(""); //일기 제목
  const [diaryContent, setDiaryContent] = useState("");

  const [scroll, setScroll] = React.useState("paper");

  const navigate = useNavigate();

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
    setDiaryContent(event.target.value);
  };

  const handleUpdateDiary = () => {
    props.updateDiaryHandler(diaryTitle, diaryContent);
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

    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    // Axios GET 요청 보내기

    const uri = "/api/diaries/" + props.diaryId;
    const encodedURI = encodeURI(uri);

    axios
      .get(encodedURI)
      .then((response) => {
        // 성공적인 응답 처리
        console.log("Response:", response.data);

        setDiaryTitle(response.data.title);
        setDiaryContent(response.data.content);
      })
      .catch((error) => {
        // 에러 핸들링 및 로그인 페이지로 리디렉션
        console.error("Error: ", error);

        if (error.response && error.response.status === 401) {
          // 만약 에러 상태 코드가 401(Unauthorized)이면 로그인 페이지로 리디렉션
          navigate("/"); // '/login'은 로그인 페이지의 경로로 수정해야 합니다.
        }
      });
  }, [open]);

  const handleBackdropClick = (e) => {
    // 모달 바깥 영역 클릭 이벤트를 무시하도록 합니다.
    e.stopPropagation();
  };

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
            value={diaryTitle}
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
            value={diaryContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDiary}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
