import { Church, Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Church Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Church className="w-6 h-6" />
              <span className="font-semibold text-xl">은혜교회</span>
            </div>
            <p className="text-gray-400 mb-4">
              하나님의 사랑과 은혜로 세상을 섬기는 교회
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  교회 소개
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  설교 말씀
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  주간 일정
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  새가족 안내
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>서울시 강남구 테헤란로 123</li>
              <li>Tel: 02-1234-5678</li>
              <li>Fax: 02-1234-5679</li>
              <li>Email: grace@church.kr</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div>© 2026 은혜교회. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white transition-colors">
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
