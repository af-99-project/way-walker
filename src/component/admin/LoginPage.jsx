import React, { useState, useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dummyPassword = "1234"; // 임시 비밀번호
  const [error, setError] = useState("");
  const [capsLock, setCapsLock] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === dummyPassword) {
      setIsLoggedIn(true); // 로그인 상태 true로
      navigate("/admin"); // 관리자 페이지로 이동
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  function onKeyDownHandler(e) {
    let isCapsLock = e.getModifierState("CapsLock");
    setCapsLock(isCapsLock);
  }

  return (
    <div className="adminPassWord">
      <form onSubmit={handleSubmit}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyDownHandler}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`pwIcon ${showPassword ? "show" : "hide"}`}
        ></button>
        <button type="submit">로그인</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : <p></p>}
        {capsLock ? <p>CapsLock이 켜져있습니다.</p> : <p></p>}
      </form>
    </div>
  );
};

export default LoginPage;
