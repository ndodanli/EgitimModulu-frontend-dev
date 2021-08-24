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
  // const clasroomChildrens = [
  //   <EMSidebarNavItem key={2} name="Sınıf Yönetimi" to="/classrooms" />,
  // ];
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
      <EMSidebarNav >
        <EMSidebarNavItem  name="Anasayfa" to="/" icon="cil-home" />

        <EMSidebarNavTitle children={["Dersler"]} />
        <EMSidebarNavDropdown
          name="Derslerim"
          route="/teacher-lessons"
          icon= 'cil-pencil'
          // icon="student-sidebar-icon"
          children={lessonChildrens}
        />

        {/* <EMSidebarNavTitle children={["Sınıf"]} />
        <EMSidebarNavDropdown
          name="Sınıflar"
          route="/clasrooms"
          icon="classroom-sidebar-icon"
          children={clasroomChildrens}
        /> */}
      </EMSidebarNav>
      <EMSidebarMinimizer className="c-d-md-down-none" />
    </EMSidebar>
  );
};

export default React.memo(LayoutSidebar);



