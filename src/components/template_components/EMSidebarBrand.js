/* eslint react/prop-types: 0 */
import React from "react";
import EMBrand from "../utils/EMBrand";

//component - CoreUI / EMSidebarBrand
const EMSidebarBrand = (props) => {
  return (
    <EMBrand {...props} className={["c-sidebar-brand", props.className]} />
  );
};

export default EMSidebarBrand;
