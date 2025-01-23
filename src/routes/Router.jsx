import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import CalendarTab from "../component/calendar";
import Waywalker from "../component/Waywalker";
import BottomNav from "../component/BottomNav";
import FixBtn from "../component/FixBtn";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="content">
                <Waywalker />
                <CalendarTab />
                <FixBtn />
                <BottomNav />
              </div>
            </>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
