import { BookOpen, Play, Download, Share2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React from 'react';

export function SermonSection() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            이번 주 말씀
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">하나님의 사랑</h2>
          <p className="text-xl text-gray-600">요한복음 3:16</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Sermon Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5fGVufDF8fHx8MTc2ODc2MzczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Bible study"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="text-sm opacity-90 mb-1">설교자</p>
                <p className="text-2xl font-semibold">김은혜 목사</p>
              </div>
            </div>
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </button>
            </div>
          </div>

          {/* Sermon Content */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed mb-6 word-break">
                "하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라"
              </p>
              <div className="h-px bg-gray-200 mb-6" />
              <p className="text-gray-600">
                하나님의 무조건적인 사랑은 우리 삶의 근본입니다. 이번 주 말씀을 통해 그 사랑의 깊이를 함께 나누고 묵상하는 시간이 되기를 바랍니다.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center gap-2">
                <Play className="w-5 h-5" />
                <span className="text-sm font-medium">재생</span>
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                <Download className="w-5 h-5" />
                <span className="text-sm font-medium">다운로드</span>
              </button>
              <button className="bg-white border border-gray-200 text-gray-700 p-4 rounded-xl hover:bg-gray-50 transition-colors flex flex-col items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">공유</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
