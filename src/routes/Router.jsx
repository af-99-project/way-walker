import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import CalendarTab from "../component/calendar";
import Waywalker from "../component/Waywalker";
import BottomNav from "../component/BottomNav";
import Table from "../component/Table";
import TeamInfo from "../component/TeamInfo";
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
                <Table />
                <CalendarTab />
                <TeamInfo />
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
