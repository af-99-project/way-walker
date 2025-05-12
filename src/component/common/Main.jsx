import React from "react";
import { useRef } from "react";
import Header from "@/component/common/Header";
import CalendarTab from "@/component/main/Calendar";
import Waywalker from "@/component/main/Waywalker";
import PrayerLead from "@/component/main/PrayerLead";
import Servant from "@/component/main/Servant";
import BottomNav from "@/component/common/BottomNav";
import Table from "@/component/main/Table";
import TeamInfo from "@/component/main/TeamInfo";
import FixBtn from "@/component/common/FixBtn";
import PrayerShare from "@/component/main/PrayerShare";
import Ad from "@/component/main/Ad";
import Footer from "@/component/common/Footer";

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
