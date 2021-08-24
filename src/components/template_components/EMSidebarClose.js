import React from "react";
import EMButtonClose from "../button_components/EMButtonClose";

//component - CoreUI / EMSidebarClose

const EMSidebarClose = (props) => {
  return (
    <EMButtonClose {...props} buttonClass={"c-sidebar-close"}>
      <svg className="c-icon" width="24" height="24" viewBox="0 0 24 24">
        <title>x</title>
        <path d="M20.030 5.030l-1.061-1.061-6.97 6.97-6.97-6.97-1.061 1.061 6.97 6.97-6.97 6.97 1.061 1.061 6.97-6.97 6.97 6.97 1.061-1.061-6.97-6.97 6.97-6.97z"></path>
      </svg>
    </EMButtonClose>
  );
};

export default EMSidebarClose;
