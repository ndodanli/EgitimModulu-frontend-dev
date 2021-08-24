import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EMHeader,
  EMToggler,
  EMHeaderBrand,
  EMHeaderNav,
  EMIcon,
} from "../../../../components/index";

import HeaderDropdown from "./HeaderDropdown";
import { SIDEBAR_SET } from "../../../../constants/generalConstants";

const LayoutHeader = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.sidebarShow);
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: SIDEBAR_SET, payload: { sidebarShow: val } });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: SIDEBAR_SET, payload: { sidebarShow: val } });
  };

  return (
    <EMHeader withSubheader>
      <EMToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <EMToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <EMHeaderBrand className="mx-auto d-lg-none" to="/">
        <EMIcon name="egitim-modulu-logo" height="48" alt="Logo" />
      </EMHeaderBrand>

      <EMHeaderNav className="d-md-down-none mr-auto"></EMHeaderNav>

      <EMHeaderNav className="px-3">
        {/* <HeaderDropdownNotif />
        <HeaderDropdownTasks />
        <HeaderDropdownMssg /> */}
        <HeaderDropdown />
      </EMHeaderNav>
    </EMHeader>
  );
};

export default LayoutHeader;
