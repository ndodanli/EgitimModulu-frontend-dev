import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EMHeader,
  EMHeaderNav,
  EMIcon,
  EMHeaderNavItem,
  EMHeaderNavLink,
} from "../../../../components/index";

import HeaderDropdown from "./HeaderDropdown";
import { SIDEBAR_SET } from "../../../../constants/generalConstants";
import HeaderDropdownNotif from "./HeaderDropdownNotif";
import HeaderDropdownTasks from "./HeaderDropdownTasks";
import HeaderDropdownMssg from "./HeaderDropdownMssg";

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
    <EMHeader withSubheader className="border-0">
      {/* <EMToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <EMToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />*/}

      {/* <EMHeaderBrand className="mx-auto d-lg-none" to="/">
        <EMIcon name="egitim-modulu-logo" height="48" alt="Logo" />
      </EMHeaderBrand> */}

      <EMHeaderNav className="d-md-down-none mr-auto">
        <EMHeaderNavItem className="px-3 ml-3">
          <EMHeaderNavLink className="font-weight-bold text-dark text-center" to="/">
            <EMIcon name="cil-home" size="lg" className="mr-2 " />
            Eğitim Modülü
          </EMHeaderNavLink>
        </EMHeaderNavItem>
        <EMHeaderNavItem className="px-3">
          <EMHeaderNavLink to="/plans">
            <EMIcon name="cil-calendar" className="mr-2 " />
            Takvim
          </EMHeaderNavLink>
        </EMHeaderNavItem>

        <EMHeaderNavItem className="px-3">
          <EMHeaderNavLink to="/homework">
            <EMIcon name="cil-color-border" className="mr-2 " />
            Ödevler
          </EMHeaderNavLink>
        </EMHeaderNavItem>
        <EMHeaderNavItem className="px-3">
          <EMHeaderNavLink>
            <EMIcon name="cil-notes" className="mr-2 " />
            Notlarım
          </EMHeaderNavLink>
        </EMHeaderNavItem>
      </EMHeaderNav>

      <EMHeaderNav className="px-3">
        <HeaderDropdownTasks />
        <HeaderDropdownMssg />
        <HeaderDropdownNotif />
        <HeaderDropdown />
      </EMHeaderNav>
    </EMHeader>
  );
};

export default LayoutHeader;
