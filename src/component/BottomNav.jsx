

function BottomNav({sectionRefs}) {

  /* const onMoveToForm = (section) => {
    if (sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      window.scrollBy({ top: -60, behavior: "smooth" });
    }
  }; */

  const onMoveToForm = (section) => {
    if (sectionRefs[section]?.current) {
        const element = sectionRefs[section].current;
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 60;
        
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
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
