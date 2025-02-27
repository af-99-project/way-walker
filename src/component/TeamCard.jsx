import React from "react";

export default function TeamCard({ item }) {
  console.log(item);

  return (
    <li key={item.id} className="teamInfo-card">
      <h4 className="teamInfo-type">{item.villageName}</h4>
      <div className="teamInfo-members">
        <span>{item.chief}</span>,{item.members}
      </div>
    </li>
  );
}
