import React, { useEffect } from "react";

function Footer() {
  return (
    <footer>
      <div className="footerInner">
        <dl>
          <dt>페이지 제작</dt>
          <dd>
            <strong>리니(이경린)</strong> <span>leegrin@sooplive.com</span>
          </dd>
          <dd>
            <strong>알베스(정태우)</strong> <span>alves@sooplive.com</span>
          </dd>
          <dd>
            <strong>노벨(명노열)</strong> <span>novel@sooplive.com</span>
          </dd>
          <dt>favicon & Logo 제작</dt>
          <dd>
            <strong>이가을</strong>
          </dd>
        </dl>
      </div>
    </footer>
  );
}

export default Footer;
