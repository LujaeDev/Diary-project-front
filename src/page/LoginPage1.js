import React from "react";
import styled from "styled-components";
import "../CSS/LoginPage.css";
import SignUpPage from "./SignUpPage";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="content">
      <div id="logo">Connect Archive</div>
      <form action="#" id="login-form">
        <label htmlFor="ID"></label>
        <input type="text" className="login-form_login-Info" placeholder="ID" />
        <br />
        <input
          type="password"
          className="login-form_login-Info"
          placeholder="PASSWORD"
        />
        <br />
        <div style={{ textAlign: "center" }}>
          <button type="submit" id="basic-login-button">
            Sign in
          </button>
        </div>
      </form>

      <ul className="find_wrap" id="find_wrap">
        <li>
          <a
            target="_blank"
            href="https://nid.naver.com/user2/api/route?m=routePwInquiry&amp;lang=ko_KR"
            className="find_text"
          >
            비밀번호 찾기
          </a>
        </li>
        <li>&nbsp; l &nbsp;</li>
        <li>
          <a
            target="_blank"
            href="https://nid.naver.com/user2/api/route?m=routeIdInquiry&amp;lang=ko_KR"
            className="find_text"
          >
            아이디 찾기
          </a>
        </li>
        <li>&nbsp; l &nbsp;</li>
        <li>
          <Link to="/signUp">
            <a>회원가입</a>
          </Link>
        </li>
      </ul>

      <div className="other-login" style={{ textAlign: "center" }}>
        <button id="naver-login-button" className="other-button">
          <img src={require("../images/btnG_완성형.png")} alt="" />
        </button>
        <button id="kakao-login-button" className="other-button">
          <img
            src={require("../images/kakao_login_medium_narrow.png")}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
