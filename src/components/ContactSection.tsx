import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import React from "react";
import NaverMap from "./common/NaverMap";

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
          <p className="text-xl text-gray-600">상록수명륜교회 방문해 주세요</p>
        </div>

        <div className="map grid md:grid-cols-2 gap-8">
          <div className="relative h-80 md:h-[420px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
            <NaverMap className="naverMap" />

            <button
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() =>
                window.open(
                  "https://map.naver.com/p/entry/place/11829151?c=15.00,0,0,0,dh&placePath=/photo&fromPanelNum=1&additionalHeight=76&timestamp=202602071328&locale=ko&svcName=map_pcv5",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
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
                    <div className="text-gray-600">경기 안산시 상록구 세류로 16</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">전화번호</div>
                    <div className="text-gray-600">대표: 031-419-0091</div>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">이메일</div>
                    <div className="text-gray-600">
                      grace@church.kr
                      <br />
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
                      평일: 오전 9시 - 오후 6시
                      <br />
                      토요일: 오전 9시 - 오후 1시
                      <br />
                      주일 및 공휴일 휴무
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
              <h4 className="font-semibold text-gray-900 mb-4">대중교통 이용</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="h-fit px-2 py-1 bg-blue-600 text-white rounded font-medium text-xs">
                    지하철
                  </div>
                  <div className="flex-1 text-gray-700">
                    4호선 상록수역 1번 출구로 나와 사리운동장행 101버스 환승
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-fit px-2 py-1 bg-green-600 text-white rounded font-medium text-xs">
                    버스
                  </div>
                  <div className="flex-1 text-gray-700">
                    · 22 (본오교회 정거장 하차 후 본오1동주민센터방향으로 400m 도보/6분소요)
                    <br />
                    ​·​ 101 (이호초등학교 정거장 하차 후 후문방향으로 200m 도보/3분 소요)
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-fit px-2 py-1 bg-gray-600 text-white rounded font-medium text-xs">
                    주차
                  </div>
                  <div className="flex-1 text-gray-700">
                    교회 내에는 장애인 주차를 할 수 있습니다. 이외의 차량은 교회 주변으로 주민차량에
                    방해가 되지 않도록 주차해 주시고, 아래의 지도에 표기된 본오1동 주차장을
                    이용해주시기 바랍니다.{" "}
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
