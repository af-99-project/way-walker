import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import CalendarTab from "../component/calendar";
import Waywalker from "../component/Waywalker";
import PrayerLead from "../component/PrayerLead";
import Servant from "../component/Servant";
import BottomNav from "../component/BottomNav";
import Table from "../component/Table";
import TeamInfo from "../component/TeamInfo";
import FixBtn from "../component/FixBtn";
import Ad from "../component/Ad";
import AdminRouter from "../component/admin/AdminRouter"; // 어드민 라우터 (위에서 생성한 파일)

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <div className="content main">
              <Waywalker />
              <Table />
              <PrayerLead />
              <Servant />
              <CalendarTab />
              <TeamInfo />
              <Ad />
              <FixBtn />
            </div>
              <BottomNav />
          </>
        }
      />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default Router;
