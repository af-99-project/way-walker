import React from "react";
import { useRef } from "react";
import Header from "../../component/Header";
import CalendarTab from "../../component/Calendar";
import Waywalker from "../../component/Waywalker";
import PrayerLead from "../../component/PrayerLead";
import Servant from "../../component/Servant";
import BottomNav from "../../component/BottomNav";
import Table from "../../component/Table";
import TeamInfo from "../../component/TeamInfo";
import FixBtn from "../../component/FixBtn";
import PrayerShare from './../PrayerShare';
import Ad from "../../component/Ad";
import Footer from "../../component/Footer";


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
        <Footer />
        <FixBtn />
      </div>
      <BottomNav sectionRefs={sectionRefs} />
    </>
  );
}
