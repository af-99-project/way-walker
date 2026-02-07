import { CreditCard, Smartphone, Building, Info } from 'lucide-react';
import React from 'react';

export function OnlineGiving() {
  const givingMethods = [
    {
      icon: CreditCard,
      title: '카드 결제',
      description: '신용카드로 간편하게 헌금하실 수 있습니다',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: '모바일 송금',
      description: '카카오페이, 토스 등으로 송금 가능합니다',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Building,
      title: '계좌 이체',
      description: '은행 계좌로 직접 이체하실 수 있습니다',
      color: 'from-purple-500 to-purple-600'
    }
  ];

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
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">십일조 헌금</div>
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  국민은행 123-456-789012
                </div>
                <div className="text-gray-600">예금주: 은혜교회</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">감사 헌금</div>
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  신한은행 987-654-321098
                </div>
                <div className="text-gray-600">예금주: 은혜교회</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">선교 헌금</div>
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  우리은행 111-222-333444
                </div>
                <div className="text-gray-600">예금주: 은혜교회</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-500 mb-2">건축 헌금</div>
                <div className="font-semibold text-lg text-gray-900 mb-1">
                  하나은행 555-666-777888
                </div>
                <div className="text-gray-600">예금주: 은혜교회</div>
              </div>
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
