/* eslint react/prop-types: 0 */
import React from "react";
import EMBrand from "../utils/EMBrand";

//component - CoreUI / EMHeaderBrand

const EMHeaderBrand = (props) => {
  return <EMBrand {...props} className={["c-header-brand", props.className]} />;
};

export default EMHeaderBrand;
