import { Users } from 'lucide-react';
import React, {useEffect, useState} from 'react';
import { db } from "../firbase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

type Props = {
  elementRef?: React.RefObject<HTMLElement>;
};

const villages = [
  {
    name: '등그라 마을',
    members: '김동혁(김),1팀, 김재후, 임미준, 강대욱, 이가을, 이은교, 김다리',
    color: 'blue'
  },
  {
    name: '주흥 마을',
    members: '김주흥,정유아, 김입홍, 전승근, 최미사, 유인혜, 김다혜, 최승근',
    color: 'purple'
  },
  {
    name: '모두와 마을',
    members: '박연지,김나현, 명복을, 염느원, 박민경, 김다혜, 박지선, 정가을, 김다은(D6)',
    color: 'green'
  },
  {
    name: '체리로 6길 마을',
    members: '채희라,김다은(D5), 김준희, 송기완, 방정호, 유민서, 황새별',
    color: 'orange'
  },
  {
    name: '하지 마을',
    members: '이석이,이가람, 정은덕, 우수진, 배재홍',
    color: 'pink'
  }
];

export function VillageIntro({ elementRef }: Props) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
  };
  const [teamInfoData, setTeamInfoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "team"), orderBy("id"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamInfoData(data);
        console.log('data',data );
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section ref={elementRef} className="py-20 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            마을
          </div>
          <h2 className="text-4xl md:text-5xl mb-4">마을을 소개합니다</h2>
          <p className="text-xl text-gray-600">함께 믿음으로 세워가는 우리의 공동체</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamInfoData.map((village, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-amber-200"
            >
              <div className="mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colorMap[villages[index].color]}`}>
                  {village.villageName}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                    <span className="text-blue-600 font-semibold">
                    {village.chief}
                    { ', '}
                    </span>
                    <span>
                      {village.members}
                    </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}