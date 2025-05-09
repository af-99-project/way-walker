import React from "react";
import { useRef } from "react";
import Header from "./Header";
import CalendarTab from "../main/Calendar";
import Waywalker from "../main/Waywalker";
import PrayerLead from "../main/PrayerLead";
import Servant from "../main/Servant";
import BottomNav from "./BottomNav";
import Table from "../main/Table";
import TeamInfo from "../main/TeamInfo";
import FixBtn from "./FixBtn";
import PrayerShare from "../main/PrayerShare";
import Ad from "../main/Ad";
import Footer from "./Footer";

export default function Main() {
  const elementRef = useRef(null);

  const sectionRefs = {
    worship: useRef(null), // 예배 순서
    calendar: useRef(null), // 캘린더
    team: useRef(null), // 마을 소개
    ad: useRef(null), // 광고
  };

  return (
    <>
      <Header />
      <div className="content main">
        <Waywalker />
        <Table elementRef={sectionRefs.worship} />
        <PrayerLead />
        <Servant />
        <CalendarTab elementRef={sectionRefs.calendar} />
        <TeamInfo elementRef={sectionRefs.team} />
        <PrayerShare />
        <Ad elementRef={sectionRefs.ad} />
      </div>
      <Footer />
      <FixBtn />
      <BottomNav sectionRefs={sectionRefs} />
    </>
  );
}
