import React from "react";
import { EMFooter } from "../../../../components/index";

function Footer() {
  return (
    <EMFooter className="footer" fixed={false}>
      <div>
        <b>Eğitim Modülü</b>
        <span className="ml-1">&copy;</span>
        2020
      </div>
    </EMFooter>
  );
}

export default React.memo(Footer);
