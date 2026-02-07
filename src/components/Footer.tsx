import { Church, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          
          <div>
            <h2 className="footer-title">Way-Walker</h2>
            <p className="footer-desc">
              교회 공동체를 위한 디지털 주보 & 예배 도우미 서비스.<br />
              작은 기록이 모여, 우리의 믿음의 발자취가 됩니다.
            </p>
          </div>

          <div>
            <h3 className="footer-subtitle">만든 사람들</h3>
            <ul className="footer-makers">
              <li>
                <span className="maker-name">이경린</span>
                <span className="maker-mail">leegrindev@gmail.com</span>
              </li>
              <li>
                <span className="maker-name">명노열</span>
                <span className="maker-mail">shduf123@naver.com</span>
              </li>
              <li>
                <span className="maker-name">정태우</span>
                <span className="maker-mail">xodn0729@naver.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© <span id="year"></span> Way-Walker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
