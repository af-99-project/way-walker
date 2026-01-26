import { useState } from "react";
import { Hero } from "./components/TopVisual";
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

import "react-calendar/dist/Calendar.css";
// import "@/App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import Routes from "@/routes/Router";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
