import React, { useEffect } from "react";

function WayWalker() {
  return (
    <div className="txtArea">
      <h2>In Jesus G. F. K. A</h2>
      <strong>
        푯대를 향하여
        <br />
        그리스도 예수 안에서 하나님이
        <br />
        위에서 부르신 부름의 상을 위하여
        <br />
        달려가노라
        <br />
        <span>빌립보서 3:14</span>
      </strong>
    </div>
  );
}

export default WayWalker;
// 3. 중첩된 라우트가 잘못 사용된 문제
// React Router에서 중첩된 라우트를 사용하려면, 부모 컴포넌트에서 반드시 Outlet을 렌더링해야 합니다. Outlet은 자식 경로의 콘텐츠를 렌더링하는 자리입니다.

// 수정 예시
// jsx
// 복사
// 편집
// import { Outlet } from "react-router-dom";

// function Header() {
//   return (
//     <div>
//       <h1>Header</h1>
//       <Outlet /> {/* 중첩된 라우트가 여기 렌더링됨 */}
//     </div>
//   );
// }
