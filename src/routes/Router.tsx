import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout"; // ✅ 올바른 경로인지 확인
import AdminMain from "@/components/admin/AdminMain"; // 기본 관리자 페이지 (예: 기존 admin.jsx 내용 활용)
import DongguriAdmin from "@/components/admin/DongguriAdmin"; // 동그리마을 admin 페이지
import AdAdmin from "@/components/admin/AdAdmin"; // 광고 admin 페이지
import IntroAdmin from "@/components/admin/IntroAdmin"; // 소개 admin 페이지
import ReportsAdmin from "@/components/admin/ReportsAdmin"; // 리포트 관리 페이지
import AnalyticsAdmin from "@/components/admin/AnalyticsAdmin"; // 분석 관리 페이지
import InventoryAdmin from "@/components/admin/InventoryAdmin"; // 재고 관리 페이지
import CleaningAdmin from "@/components/admin/CleaningAdmin"; // 청소 관리 페이지
import LogsAdmin from "@/components/admin/LogsAdmin"; // 로그 관리 페이지
import RequireAuth from "@/routes/RequireAuth"; // 또는 경로가 다르면 아래 참고
import LoginPage from "@/components/admin/LoginPage";
import Main from "@/components/common/Main";
import Live from "@/components/admin/Live";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/admin/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminMain />} />
          <Route path="dongguri" element={<DongguriAdmin />} />
          <Route path="adAdmin" element={<AdAdmin />} />
          <Route path="intro" element={<IntroAdmin />} />
          <Route path="reports" element={<ReportsAdmin />} />
          <Route path="live" element={<Live />} />
          <Route path="analytics" element={<AnalyticsAdmin />} />
          <Route path="inventory" element={<InventoryAdmin />} />
          <Route path="cleaning" element={<CleaningAdmin />} />
          <Route path="logs" element={<LogsAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
