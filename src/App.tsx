import React, { useState } from "react";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { SermonSection } from "./components/SermonSection";
import { WorshipOrder } from "./components/WorshipOrder";
import { Announcements } from "./components/Announcements";
import { WeeklySchedule } from "./components/WeeklySchedule";
import { PrayerRequest } from "./components/PrayerRequest";
import { OnlineGiving } from "./components/OnlineGiving";
import { LiveStream } from "./components/LiveStream";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { VillageIntro } from "./components/VilageIntro";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen bg-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <Hero />
        {/* <SermonSection /> */}
        <WorshipOrder />
        <WeeklySchedule />
        <LiveStream />
        {/* <PrayerRequest /> */}
        <VillageIntro />
        {/* <OnlineGiving /> */}
        {/* <ContactSection /> */}
        <Announcements />
      </main>
      <Footer />
    </div>
  );
}
