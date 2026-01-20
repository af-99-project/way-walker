import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import React from 'react';

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            오시는 길
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">찾아오시는 길</h2>
          <p className="text-xl text-gray-600">은혜교회를 방문해 주세요</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="relative aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700 mb-1">지도가 여기에 표시됩니다</p>
                  <p className="text-sm text-gray-500">서울시 강남구 테헤란로 123</p>
                </div>
              </div>
            </div>
            
            {/* Navigation Button */}
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Navigation className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">길찾기</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">연락처 정보</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">주소</div>
                    <div className="text-gray-600">
                      서울시 강남구 테헤란로 123<br />
                      은혜교회 본관 (우편번호: 06234)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">전화번호</div>
                    <div className="text-gray-600">
                      대표: 02-1234-5678<br />
                      팩스: 02-1234-5679
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">이메일</div>
                    <div className="text-gray-600">
                      grace@church.kr<br />
                      info@gracechurch.kr
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">사무실 운영시간</div>
                    <div className="text-gray-600">
                      평일: 오전 9시 - 오후 6시<br />
                      토요일: 오전 9시 - 오후 1시<br />
                      주일 및 공휴일 휴무
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
              <h4 className="font-semibold text-gray-900 mb-4">대중교통 이용</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="px-2 py-1 bg-blue-600 text-white rounded font-medium text-xs">
                    지하철
                  </div>
                  <div className="flex-1 text-gray-700">
                    2호선 강남역 3번 출구에서 도보 5분
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="px-2 py-1 bg-green-600 text-white rounded font-medium text-xs">
                    버스
                  </div>
                  <div className="flex-1 text-gray-700">
                    간선: 146, 401, 402 / 지선: 3412, 4419
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="px-2 py-1 bg-gray-600 text-white rounded font-medium text-xs">
                    주차
                  </div>
                  <div className="flex-1 text-gray-700">
                    교회 건물 지하 1~3층 주차 가능
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
