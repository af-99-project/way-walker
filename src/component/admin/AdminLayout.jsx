import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "../AdminLayout.css";
import Header from "../../component/Header";
import BottomNav from "../../component/BottomNav";
const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-container-wrap">
      <aside className="sidebar">
        <h2>목록</h2>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}
              >
                예배순서
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dongguri"
                className={`nav-link ${location.pathname === "/admin/dongguri" ? "active" : ""}`}
              >
                마을
              </Link>
            </li>
            <li>
              <Link
                to="/admin/adAdmin"
                className={`nav-link ${location.pathname === "/admin/adAdmin" ? "active" : ""}`}
              >
                광고
              </Link>
            </li>
            <li>
              <Link
                to="/admin/intro"
                className={`nav-link ${location.pathname === "/admin/intro" ? "active" : ""}`}
              >
                대표기도
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className={`nav-link ${location.pathname === "/admin/reports" ? "active" : ""}`}
              >
                섬김이
              </Link>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className={`nav-link ${location.pathname === "/admin/analytics" ? "active" : ""}`}
              >
                일정
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cleaning"
                className={`nav-link ${location.pathname === "/admin/cleaning" ? "active" : ""}`}
              >
                청소 마을
              </Link>
            </li>
            <li>
              <Link
                to="/admin/inventory"
                className={`nav-link ${location.pathname === "/admin/inventory" ? "active" : ""}`}
              >
                기도제목 나눔
              </Link>
            </li>
            <li>
              <Link
                to="/admin/notifications"
                className={`nav-link ${location.pathname === "/admin/notifications" ? "active" : ""}`}
              >
                QR코드생성
              </Link>
            </li>
            <li>
              <Link
                to="/admin/feedback"
                className={`nav-link ${location.pathname === "/admin/feedback" ? "active" : ""}`}
              >
                기타 문의사항
              </Link>
            </li>
            <li>
              <Link
                to="/admin/logs"
                className={`nav-link ${location.pathname === "/admin/logs" ? "active" : ""}`}
              >
                만든이
              </Link>
            </li>
          </ul>
        </nav>
        <h1 className="logo">
          <a href="#" target="_blank">
            wayWalker
          </a>
        </h1>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
