import React, { useEffect } from "react";

function Header() {
  return (
    <header id="header">
      <h1 className="logo">
        <a href="#">청년여호수아</a>
      </h1>
    </header>
  );
}

export default Header;
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
