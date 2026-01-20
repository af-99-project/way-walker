import { Calendar, Clock, MapPin } from 'lucide-react';
import React, { useState } from 'react';

export function WeeklySchedule() {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  const schedule = [
    { 
      day: '주일', 
      dayEn: 'Sunday',
      events: [
        { time: '09:00', name: '1부 예배', location: '본당' },
        { time: '11:00', name: '2부 예배 (대예배)', location: '본당' },
        { time: '13:30', name: '유초등부 예배', location: '3층 교육관' },
        { time: '14:00', name: '중고등부 예배', location: '2층 청소년부실' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    { 
      day: '화요일', 
      dayEn: 'Tuesday',
      events: [
        { time: '10:00', name: '여전도회 모임', location: '소예배실' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    { 
      day: '수요일', 
      dayEn: 'Wednesday',
      events: [
        { time: '19:00', name: '수요 예배', location: '본당' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    { 
      day: '금요일', 
      dayEn: 'Friday',
      events: [
        { time: '20:00', name: '청년부 성경공부', location: '청년부실' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    { 
      day: '토요일', 
      dayEn: 'Saturday',
      events: [
        { time: '06:00', name: '새벽기도회', location: '본당' },
        { time: '15:00', name: '구역예배', location: '각 구역' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
  ];

  const monthlySchedule = [
    {
      date: '1월 19일',
      dateEn: '19',
      events: [
        { time: '11:00', name: '주일 대예배', location: '본당' },
        { time: '14:00', name: '새가족 환영회', location: '2층 교육관' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    {
      date: '1월 22일',
      dateEn: '22',
      events: [
        { time: '19:00', name: '수요 예배', location: '본당' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    {
      date: '1월 25일',
      dateEn: '25',
      events: [
        { time: '10:00', name: '구역예배 인도자 교육', location: '소예배실' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    {
      date: '1월 26일',
      dateEn: '26',
      events: [
        { time: '11:00', name: '주일 대예배', location: '본당' },
        { time: '13:00', name: '애찬(점심식사)', location: '식당' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
    {
      date: '1월 29일',
      dateEn: '29',
      events: [
        { time: '19:00', name: '수요 예배', location: '본당' },
        { time: '20:30', name: '목회자 모임', location: '회의실' },
      ],
      color: 'from-slate-700 to-slate-800'
    },
  ];

  const currentSchedule = viewMode === 'weekly' ? schedule : monthlySchedule;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            일정
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">교회 일정</h2>
          <p className="text-xl text-gray-600">함께 모여 하나님을 예배하고 교제하는 시간</p>
          
          {/* View Mode Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                viewMode === 'weekly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              주간 일정
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                viewMode === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              월간 일정
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSchedule.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              {/* Day Header */}
              <div className={`bg-gradient-to-r ${day.color} p-6 text-white`}>
                <div className="text-sm opacity-90 mb-1">{viewMode === 'weekly' ? day.dayEn : day.dateEn}</div>
                <div className="text-2xl font-bold">{viewMode === 'weekly' ? day.day : day.date}</div>
              </div>

              {/* Events */}
              <div className="p-6 space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="group hover:bg-gray-50 p-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all">
                        <Clock className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-blue-600 mb-1">
                          {event.time}
                        </div>
                        <div className="font-medium text-gray-900 mb-1">
                          {event.name}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}