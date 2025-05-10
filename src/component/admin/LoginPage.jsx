import React, { useState, useContext } from "react";
import AuthContext from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dummyPassword = "1234";
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === dummyPassword) {
      setIsLoggedIn(true); // ✅ 로그인 상태 true로
      setError("");
      navigate("/admin"); // ✅ 관리자 페이지로 이동
    } else {
      setError("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "숨기기" : "보이기"}
      </button>
      <button type="submit">로그인</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
