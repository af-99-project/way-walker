import React from "react";
import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
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
  const elementRef = useRef(null);


  const sectionRefs = {
    worship: useRef(null),  // 예배 순서
    calendar: useRef(null), // 캘린더
    team: useRef(null),     // 마을 소개
    ad: useRef(null),       // 광고
  };


  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <div className="content main">
              <Waywalker />
              <Table elementRef={sectionRefs.worship} />
              <PrayerLead />
              <Servant />
              <CalendarTab elementRef={sectionRefs.calendar}/>
              <TeamInfo elementRef={sectionRefs.team}/>
              <Ad elementRef={sectionRefs.ad}/>
              <FixBtn />
            </div>
            <BottomNav sectionRefs={sectionRefs} />
          </>
        }
      />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default Router;
