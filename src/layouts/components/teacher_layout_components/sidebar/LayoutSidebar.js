import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  EMSidebar,
  EMSidebarBrand,
  EMSidebarNav,
  EMSidebarNavTitle,
  EMSidebarMinimizer,
  EMSidebarNavDropdown,
  EMSidebarNavItem,
  EMIcon,
} from "../../../../components/index";

// sidebar nav config
import { SIDEBAR_SET } from "../../../../constants/generalConstants";

const LayoutSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow } = useSelector((state) => state.sidebarShow);

  const lessonChildrens = [
    <EMSidebarNavItem key={1} name="Derslerimi Göster" to="/teacher-lessons" />,
  ];
  return (
    <EMSidebar
      show={sidebarShow}
      onShowChange={(val) =>
        dispatch({ type: SIDEBAR_SET, payload: { sidebarShow: val } })
      }
    >
      <EMSidebarBrand className="d-md-down-none" to="/">
        <EMIcon
          className="c-sidebar-brand-full"
          name="egitim-modulu-logo"
          height={35}
        />
      </EMSidebarBrand>
      <EMSidebarNav>
        <EMSidebarNavItem name="Kontrol Paneli" to="/" icon="cil-speedometer" />

        <EMSidebarNavTitle children={["Derslerimi Göster"]} />
        <EMSidebarNavDropdown
          name="Derslerim"
          route="/teacher-lessons"
          icon="student-sidebar-icon"
          children={lessonChildrens}
        />
      </EMSidebarNav>
      <EMSidebarMinimizer className="c-d-md-down-none" />
    </EMSidebar>
  );
};

export default React.memo(LayoutSidebar);
