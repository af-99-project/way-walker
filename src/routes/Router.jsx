import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminRouter from "../component/admin/AdminRouter"; // 어드민 라우터 (위에서 생성한 파일)
import Main from "../component/common/Main";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default Router;
