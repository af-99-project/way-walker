import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [capsLock, setCapsLock] = useState(false);

  const navigate = useNavigate();

  const onKeyDownHandler = (e) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("✅ submit fired", { email, passwordLength: password.length });

    try {
      const auth = getAuth();

      console.log("🔥 firebase projectId:", auth.app?.options?.projectId);

      const res = await signInWithEmailAndPassword(auth, email.trim(), password.trim());

      console.log("🎉 LOGIN SUCCESS:", res.user.uid);

      // ✅ 여기서 상태 세팅 안 함! AuthProvider가 알아서 user 갱신함
      navigate("/admin", { replace: true });
    } catch (err) {
      const msg =
        (err && (err.code || err.message)) ||
        (typeof err === "string" ? err : JSON.stringify(err)) ||
        "unknown-error";

      console.error("🔥 LOGIN ERROR RAW:", err);
      console.error("🔥 LOGIN ERROR MSG:", msg);

      setError(msg);
    }
  };

  return (
    <div className="adminPassWord">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={onKeyDownHandler}
          onKeyUp={onKeyDownHandler}
          autoComplete="current-password"
          className="password"
        />

        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className={`pwIcon ${showPassword ? "show" : "hide"}`}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
        />

        <button type="submit">로그인</button>

        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        {capsLock ? <p>CapsLock이 켜져있습니다.</p> : null}
      </form>
    </div>
  );
};

export default LoginPage;
