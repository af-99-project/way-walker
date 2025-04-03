import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout"; // ✅ 올바른 경로인지 확인
import AdminMain from "./AdminMain"; // 기본 관리자 페이지 (예: 기존 admin.jsx 내용 활용)
import DongguriAdmin from "./DongguriAdmin"; // 동그리마을 admin 페이지
import AdAdmin from "./AdAdmin"; // 광고 admin 페이지
import IntroAdmin from "./IntroAdmin"; // 소개 admin 페이지
import ReportsAdmin from "./ReportsAdmin"; // 리포트 관리 페이지
import AnalyticsAdmin from "./AnalyticsAdmin"; // 분석 관리 페이지
import InventoryAdmin from "./InventoryAdmin"; // 재고 관리 페이지
import NotificationsAdmin from "./NotificationsAdmin"; // 알림 관리 페이지
import FeedbackAdmin from "./FeedbackAdmin"; // 피드백 관리 페이지
import LogsAdmin from "./LogsAdmin"; // 로그 관리 페이지

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
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

export default AdminRouter;
