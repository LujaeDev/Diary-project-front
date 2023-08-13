import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import MainPage from "./page/MainPage";
import React, { useEffect, useState } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={LoginPage} />
        <Route path="/signUp" Component={SignUpPage} />
        <Route path="/main" Component={MainPage} />
      </Routes>
    </Router>
  );
}

// function App() {
//   const [hello, setHello] = useState("");
//   useEffect(() => {
//     axios
//       .get("/api/hello")
//       .then((response) => setHello(response.data))
//       .catch((error) => console.log(error));
//   }, []);
//   return <div>백엔드에서 가져온 데이터입니다 : {hello}</div>;
// }

export default App;
