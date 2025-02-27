import React from "react";

export default function WayWalkerCard() {
  const arr = ["이경린", "명노엘", "정태우", "이경린", "명노엘", "정태우"];
  return (
    <div className="wayWalker-card">
      <span className="title">임원</span>
      <div>
        {arr.map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
}
