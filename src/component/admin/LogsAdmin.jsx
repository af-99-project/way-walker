import React, { useState } from "react";
import { motion } from "framer-motion";
import "../admincss/LogsAdmin.css"; // CSS 파일 임포트

const LogsAdmin = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "노벨",
      role: "Project Manager",
      description: "혁신적인 아이디어로 프로젝트를 이끌어갑니다",
      color: "gradient-bg-blue",
    },
    {
      name: "리니",
      role: "Developer",
      description: "뛰어난 개발 실력으로 프로젝트를 완성합니다",
      color: "gradient-bg-purple",
    },
    {
      name: "알베스",
      role: "Designer",
      description: "세련된 디자인으로 프로젝트를 빛냅니다",
      color: "gradient-bg-indigo",
    },
  ];

  return (
    <div className="logs-container">
      {/* 헤더 섹션 */}
      <div className="header-section">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-title"
        >
          Project Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="header-subtitle"
        >
          WayWalker
        </motion.p>
      </div>

      {/* 팀원 카드 섹션 */}
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="team-card"
            onMouseEnter={() => setHoveredMember(member.name)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className={`member-avatar ${member.color}`}>
              <span className="text-2xl font-bold text-white">{member.name[0]}</span>
            </div>
            <h2 className="member-name">{member.name}</h2>
            <p className="member-role">{member.role}</p>
            <p className="member-description">{member.description}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredMember === member.name ? 1 : 0 }}
              className="action-button-container"
            >
              <button className={`action-button ${member.color}`}>자세히 보기</button>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 하단 섹션 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bottom-section"
      >
        <p className="bottom-text">우리는 함께 성장하며 더 나은 서비스를 만들어갑니다</p>
      </motion.div>
    </div>
  );
};

export default LogsAdmin;
