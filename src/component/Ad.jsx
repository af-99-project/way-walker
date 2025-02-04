import React from "react";

export default function Ad() {
  return (
    <div className="notice-container">
      <div className="notice-header">
        <span className="megaphone-icon">
          <img src="/src/assets/loudspeaker.svg" alt="mainLogo" />
        </span>
        <h1>광고</h1>
      </div>

      <div className="notice-section">
        <h2>1. 이번주 2부 순서</h2>
        <p>생일파티 및 말씀 나눔 입니다.</p>
      </div>

      <div className="notice-section">
        <h2>
          2. 예배를 위한 기도모임<span clclassNameass="prayer-emoji">🙏</span>
        </h2>
        <p>예배 전 오후 1시 40분에 성전에서 기도모임이 있습니다!</p>
        <p>예배를 사모하는 마음으로 모두 함께 모여 기도하면 좋겠습니다.</p>
        <img src="/img/logo.png" alt="text" />
      </div>

      <div className="notice-section">
        <h2>3. 연말정산 (기부금 영수증 신청)</h2>
        <p>연말 정산, 기부금 영수증이 필요하신 분들은 2층 교회 사무실로 신청해주시기 바랍니다.</p>
      </div>

      <div className="notice-section">
        <h2>4. 이소리 청년 결혼</h2>
        <p>일시 : 1월 18일(토) 오전 11시</p>
        <p>장소 : ~~~~~~2층 (수원) / 어쩌구어쩌구 노벨 존잘</p>
      </div>

      <div className="notice-section">
        <h2>5. 다음 주 2부 순서</h2>
        <div className="member-list">
          알베스 개하남자 리니 개하여자 알베스 개하남자 리니 개하여자
        </div>
      </div>
    </div>
  );
}
