import { useRef, useState } from "react";
import { Navigation } from "../Navigation";
import { SermonSection } from "../SermonSection";
import { WorshipOrder } from "../WorshipOrder";
import { WeeklySchedule } from "../WeeklySchedule";
import { VillageIntro } from "../VilageIntro";
import { Footer } from "../Footer";
import { Announcements } from "../Announcements";
import { LiveStream } from "../LiveStream";
import { PrayerRequest } from "../PrayerRequest";
import { OnlineGiving } from "../OnlineGiving";
import { ContactSection } from "../ContactSection";
import Header from "./Header";
import FixBtn from "./FixBtn";
import TopVisual from "../TopVisual";
import BottomNav from "./BottomNav";



export default function Main() {
  const [activeSection, setActiveSection] = useState("home");

  
  
  const elementRef = useRef(null);

  const sectionRefs = {
      worship: useRef<HTMLElement | null>(null), // 예배 순서
      calendar: useRef<HTMLElement | null>(null), // 캘린더
      team: useRef<HTMLElement | null>(null), // 마을 소개
      ad: useRef<HTMLElement | null>(null), // 광고
  };

  type Props = {
    elementRef?: React.RefObject<HTMLElement>;
  };
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <TopVisual /> {/* 상단 비쥬얼 영역 */}
        <WorshipOrder elementRef={sectionRefs.worship} /> {/* 예배순서 */}
        <WeeklySchedule elementRef={sectionRefs.calendar} />{/* 캘린더 */}
        <LiveStream />{/* 라이브 */}
        {/* <PrayerRequest /> 기도요청 */}
        <VillageIntro elementRef={sectionRefs.team} /> {/*  */}
        <OnlineGiving />
        <Announcements elementRef={sectionRefs.ad} />
        <ContactSection />
      </main>
      <FixBtn />
      <Footer />
      <BottomNav sectionRefs={sectionRefs} />
    </div>
  );
}
