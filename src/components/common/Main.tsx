import { useState } from "react";
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

export default function Main() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation activeSection={activeSection} setActiveSection={setActiveSection} /> */}
      <Header />
      <main>
        <TopVisual />
        <WorshipOrder />

        <WeeklySchedule />
        <LiveStream />
        <PrayerRequest />
        <VillageIntro />
        <OnlineGiving />
        <Announcements />
        <ContactSection />
      </main>
      <FixBtn />
      <Footer />
    </div>
  );
}
