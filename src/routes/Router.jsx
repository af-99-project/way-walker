import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../component/admin/AdminLayout"; // ✅ 올바른 경로인지 확인
import AdminMain from "../component/admin/AdminMain"; // 기본 관리자 페이지 (예: 기존 admin.jsx 내용 활용)
import DongguriAdmin from "../component/admin/DongguriAdmin"; // 동그리마을 admin 페이지
import AdAdmin from "../component/admin/AdAdmin"; // 광고 admin 페이지
import IntroAdmin from "../component/admin/IntroAdmin"; // 소개 admin 페이지
import ReportsAdmin from "../component/admin/ReportsAdmin"; // 리포트 관리 페이지
import AnalyticsAdmin from "../component/admin/AnalyticsAdmin"; // 분석 관리 페이지
import InventoryAdmin from "../component/admin/InventoryAdmin"; // 재고 관리 페이지
import NotificationsAdmin from "../component/admin/NotificationsAdmin"; // 알림 관리 페이지
import FeedbackAdmin from "../component/admin/FeedbackAdmin"; // 피드백 관리 페이지
import LogsAdmin from "../component/admin/LogsAdmin"; // 로그 관리 페이지

import Main from "../component/common/Main";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminMain />} />
        <Route path="dongguri" element={<DongguriAdmin />} />
        <Route path="adAdmin" element={<AdAdmin />} />
        <Route path="intro" element={<IntroAdmin />} />
        <Route path="reports" element={<ReportsAdmin />} />
        <Route path="analytics" element={<AnalyticsAdmin />} />
        <Route path="inventory" element={<InventoryAdmin />} />
        <Route path="notifications" element={<NotificationsAdmin />} />
        <Route path="feedback" element={<FeedbackAdmin />} />
        <Route path="logs" element={<LogsAdmin />} />
      </Route>
    </Routes>
  );
};

export default Router;
