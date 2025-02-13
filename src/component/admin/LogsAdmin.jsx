import React, { useState } from "react";
import { motion } from "framer-motion";

const LogsAdmin = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "노벨",
      role: "Project Manager",
      description: "혁신적인 아이디어로 프로젝트를 이끌어갑니다",
      color: "bg-blue-500",
    },
    {
      name: "리니",
      role: "Developer",
      description: "뛰어난 개발 실력으로 프로젝트를 완성합니다",
      color: "bg-purple-500",
    },
    {
      name: "알베스",
      role: "Designer",
      description: "세련된 디자인으로 프로젝트를 빛냅니다",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      {/* 헤더 섹션 */}
      <div className="max-w-5xl mx-auto mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 text-center"
        >
          Project Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 text-center mt-4"
        >
          WayWalker
        </motion.p>
      </div>

      {/* 팀원 카드 섹션 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
            onMouseEnter={() => setHoveredMember(member.name)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div
              className={`
              p-8 rounded-2xl bg-white shadow-lg 
              transform transition-all duration-300
              ${hoveredMember === member.name ? "scale-105" : "scale-100"}
              hover:shadow-2xl
            `}
            >
              {/* 멤버 아바타 */}
              <div
                className={`
                w-16 h-16 rounded-full ${member.color}
                flex items-center justify-center mb-6
                transform transition-all duration-300
                ${hoveredMember === member.name ? "scale-110" : "scale-100"}
              `}
              >
                <span className="text-2xl font-bold text-white">{member.name[0]}</span>
              </div>

              {/* 멤버 정보 */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h2>
              <p className="text-sm font-medium text-gray-500 mb-4">{member.role}</p>
              <p className="text-gray-600">{member.description}</p>

              {/* 호버 시 나타나는 액션 버튼 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredMember === member.name ? 1 : 0 }}
                className="mt-6"
              >
                <button
                  className={`
                  px-4 py-2 rounded-lg text-white
                  ${member.color} hover:opacity-90
                  transition-all duration-300
                `}
                >
                  자세히 보기
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 하단 섹션 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-2xl mx-auto text-center mt-20"
      >
        <p className="text-gray-600 text-lg">우리는 함께 성장하며 더 나은 서비스를 만들어갑니다</p>
      </motion.div>
    </div>
  );
};

export default LogsAdmin;
