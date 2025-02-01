import React, { useEffect } from "react";
import TeamCard from "./TeamCard";

function TeamInfo() {
  return (
    <div className="teamInfo-container">
      <div class="teamInfo-header">
        <h1 class="teamInfo-title">마을 소개</h1>
        <p class="teamInfo-subtitle">
          함께 웃고 울고 모임의 시간이 설레이는
          <br /> 마을을 소개합니다!
        </p>
      </div>
      <ul>
        <TeamCard />
      </ul>
    </div>
  );
}

export default TeamInfo;
