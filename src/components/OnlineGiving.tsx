import { CreditCard, Smartphone, Building, Info } from 'lucide-react';
import React from 'react';
import { usePrayerTopics } from '@/hook/usePrayerTopics';

export function OnlineGiving() {
  const { data: prayerTopics } = usePrayerTopics();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4" />
            온라인 헌금
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">헌금 안내</h2>
          <p className="text-xl text-gray-600">온라인으로 편리하게 헌금하실 수 있습니다</p>
        </div>

        {/* Bank Account Info */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">계좌 정보</h3>
                <p className="text-gray-600">아래 계좌로 헌금을 보내주실 수 있습니다</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {prayerTopics?.account && (
                <div className="bg-white rounded-2xl p-6 shadow-sm word-break">
                  <div className="text-sm text-gray-500 mb-2">온라인 계좌 정보</div>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {prayerTopics.account}
                  </div>
                  <button
                    className="mt-3 text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      navigator.clipboard.writeText(prayerTopics.account);
                      alert("계좌번호가 복사되었습니다.");
                    }}
                  >
                    계좌번호 복사
                  </button>
                </div>
              )}

              {prayerTopics?.account2 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm word-break">
                  <div className="text-sm text-gray-500 mb-2">청년 교육후원 계좌 정보</div>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {prayerTopics.account2}
                  </div>
                  <button
                    className="mt-3 text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      navigator.clipboard.writeText(prayerTopics.account);
                      alert("계좌번호가 복사되었습니다.");
                    }}
                  >
                    계좌번호 복사
                  </button>
                </div>
              )}

              {!prayerTopics?.account && !prayerTopics?.account2 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm md:col-span-2 word-break">
                  <div className="text-sm text-gray-500 mb-2">계좌 정보</div>
                  <div className="text-gray-600">등록된 계좌 정보가 없습니다.</div>
                </div>
              )}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                💡 입금 시 입금자명에 헌금 종류를 함께 적어주시면 감사하겠습니다. 
                (예: 홍길동-십일조, 김은혜-감사)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
