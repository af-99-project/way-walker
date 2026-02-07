import { Church, Facebook, Instagram, Youtube, Mail } from "lucide-react";
import React from "react";

export function Footer() {
  return (
    <footer className=" text-gray-400 p-4 bg-gradient-to-b from-gray-900 to-black text-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 md:grid-cols-3 mb-12">
          {/* Brand / About */}
          <div>
            <h2 className="text-xl font-bold  text-gray-400 mb-4">Way-Walker</h2>
            <p className="text-sm leading-relaxed text-gray-400">
              교회 공동체를 위한 디지털 주보 & 예배 도우미 서비스.
              <br />
              작은 기록이 모여, 우리의 믿음의 발자취가 됩니다.
            </p>
          </div>

          {/* Makers */}
          <div>
            <h3 className="font-semibold text-gray-400 mb-4">만든 사람들</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex flex-col">
                <span className="text-white">이경린</span>
                <span className="text-xs">leegrindev@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white">명노열</span>
                <span className="text-xs">shduf123@naver.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white">정태우</span>
                <span className="text-xs">xodn0729@naver.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Way-Walker. All rights reserved.</p>
          <p>Made with ❤️ for the Church</p>
        </div>
      </div>
    </footer>
  );
}
