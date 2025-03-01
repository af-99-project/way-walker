

function BottomNav({sectionRefs}) {

  const onMoveToForm = (section) => {
    if (sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy({ top: -60, behavior: "smooth" }); // 60px 위로 추가 이동
    }
  };

  return (
    <div className="bottomNavbar">
      <ul>
        <li>
          <button onClick={() => onMoveToForm("worship")}>예배 순서</button>
        </li>
        <li>
          <button onClick={() => onMoveToForm("calendar")}>캘린더</button>
        </li>
        <li>
          <button onClick={() => onMoveToForm("team")}>마을 소개</button>
        </li>
        <li>
          <button onClick={() => onMoveToForm("ad")}>광고</button>
        </li>
      </ul>
    </div>
  );
}

export default BottomNav;
