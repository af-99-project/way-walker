import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import CalendarTab from "../component/calendar";
import Waywalker from "../component/Waywalker";
import BottomNav from "../component/BottomNav";
import Table from "../component/Table";
import TeamInfo from "../component/TeamInfo";
import FixBtn from "../component/FixBtn";
import Ad from "../component/Ad";
import Admin from "../component/admin"; // ✅ 추가

const Router = () => {
  return (
    <>
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="content">
                <Waywalker />
                <Table />
                <CalendarTab />
                <TeamInfo />
                <Ad />
                <FixBtn />
                <BottomNav />
              </div>
            </>
          }
        />

        {/* 어드민 페이지 추가 */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default Router;
