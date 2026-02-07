import React from "react";
import { NavLink } from "react-router-dom";
import "@/styles/Admin.css"; // 스타일은 필요에 따라 작성

const AdminNav = () => {
  return (
    <nav className="admin-nav">
      <ul>
        <li>
          <NavLink to="/admin/main" end activeClassName="active">
            메인 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/dongguri" activeClassName="active">
            동그리마을 admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/ad" activeClassName="active">
            광고 admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/live" end activeClassName="active">
            Live 버튼
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/intro" activeClassName="active">
            소개 admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" activeClassName="active">
            리포트 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/analytics" activeClassName="active">
            분석 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/inventory" activeClassName="active">
            기도제목 나눔
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/notifications" activeClassName="active">
            알림 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/feedback" activeClassName="active">
            피드백 관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/logs" activeClassName="active">
            로그 관리
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
