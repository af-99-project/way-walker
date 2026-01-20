import React, { useEffect, useState } from "react";

function FixBtn() {

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
      window.scroll({
          top: 0,
          behavior: 'smooth'
      })
  }

  useEffect(() => {
    const handleShowButton = () => {
        if (window.scrollY > 50) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

      window.addEventListener("scroll", handleShowButton)
      return () => {
          window.removeEventListener("scroll", handleShowButton)
      }
    }, [])

  return (
    <div className={`fixBtn ${showButton ? "active" : ""}`}>
      <a href="https://www.youtube.com/@as_smc#" target="_blank" className="youtube"></a>
      <a href="https://band.us/band/78423551#content" target="_blank" className="band"></a>
      <button type="button" onClick={scrollToTop} className="top"></button>
    </div>
  );
}

export default FixBtn;
