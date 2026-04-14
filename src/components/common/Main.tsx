import { useRef, useState } from "react";
import { WorshipOrder } from "../WorshipOrder";
import { WeeklySchedule } from "../WeeklySchedule";
import { CleaningSection } from "../CleaningSection";
import { VillageIntro } from "../VilageIntro";
import { Footer } from "../Footer";
import { Announcements } from "../Announcements";
import { PrayerRequest } from "../PrayerRequest";
import { OnlineGiving } from "../OnlineGiving";
import { ContactSection } from "../ContactSection";
import Header from "./Header";
import FixBtn from "./FixBtn";
import TopVisual from "../TopVisual";
import BottomNav from "./BottomNav";
import PrayerLead from "../PrayerLead";
import LeaderList from "../reader";

export default function Main() {
  const [activeSection, setActiveSection] = useState("home");

  type Props = {
    elementRef?: React.RefObject<HTMLElement>;
  };

  const elementRef = useRef(null);

  const sectionRefs = {
      worship: useRef<HTMLElement | null>(null), // 예배 순서
      calendar: useRef<HTMLElement | null>(null), // 캘린더
      team: useRef<HTMLElement | null>(null), // 마을 소개
      ad: useRef<HTMLElement | null>(null), // 광고
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="main_conts">
        <TopVisual />
        <WorshipOrder elementRef={sectionRefs.worship} />
        <PrayerLead />
        <WeeklySchedule elementRef={sectionRefs.calendar} />
        <Announcements elementRef={sectionRefs.ad} />
        <CleaningSection />
        <PrayerRequest />
        <LeaderList />
        <VillageIntro elementRef={sectionRefs.team} />
        <OnlineGiving />
        <ContactSection />
      </main>
      <FixBtn />
      <Footer />
      <BottomNav sectionRefs={sectionRefs} />
    </div>
  );
}