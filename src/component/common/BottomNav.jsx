import { useEffect, useState } from "react";

function BottomNav({ sectionRefs }) {
  const onMoveToForm = (section) => {
    if (sectionRefs[section]?.current) {
      const element = sectionRefs[section].current;
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 60;

      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleShowNavbar = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleShowNavbar);
    return () => {
      window.removeEventListener("scroll", handleShowNavbar);
    };
  }, []);

  return (
    <div className={`bottomNavbar ${showNavbar ? "active" : ""}`}>
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
