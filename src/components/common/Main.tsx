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
import { Hero } from "../Hero";

export default function Main() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <SermonSection />
        <WorshipOrder />
        <Announcements />
        <WeeklySchedule />
        <LiveStream />
        <PrayerRequest />
        <VillageIntro />
        <OnlineGiving />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
