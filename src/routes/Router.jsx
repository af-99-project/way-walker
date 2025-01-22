import React from "react";
import { Routes, Route } from "react-router-dom";
import TestPage from "../component/test";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestPage />} />
      </Routes>
    </>
  );
};

export default Router;
