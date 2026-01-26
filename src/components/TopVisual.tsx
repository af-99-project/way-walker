import React, { useEffect, useState } from "react";

function TopVisual() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="topVisual">
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

      <div className={`scroll-indicator ${scroll ? "none" : ""}`}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </div>
  );
}

export default TopVisual;
