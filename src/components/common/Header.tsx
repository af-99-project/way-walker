import React, { useEffect, useState } from "react";

function Header() {
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const handleShowBg = () => {
      if (window.scrollY > 50) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    };

    window.addEventListener("scroll", handleShowBg);
    return () => {
      window.removeEventListener("scroll", handleShowBg);
    };
  }, []);

  return (
    <header id="header" className={`${showBg ? "active" : ""}`}>
      <h1 className="logo">
        <a href="#">청년여호수아</a>
      </h1>
    </header>
  );
}

export default Header;