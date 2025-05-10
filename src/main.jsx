import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Router";
import { AuthProvider } from "./context/AuthProvider"; // ✅ 추가

// 👉 baseUrl이 필요한 경우, 기본값 설정 (예: 환경변수 또는 "/" 기본 경로)
const baseUrl = "/";

// 루트 DOM 요소 가져오기
const rootElement = document.getElementById("root");

// React 앱 렌더링
createRoot(rootElement).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter basename={baseUrl}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </DndProvider>
  </StrictMode>,
);
