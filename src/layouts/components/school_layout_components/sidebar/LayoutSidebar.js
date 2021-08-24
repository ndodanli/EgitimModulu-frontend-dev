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

  const teacherChildrens = [
    <EMSidebarNavItem key={0} name="Öğretmen Yönetimi" to="/teachers" />,
  ];
  const studentChildrens = [
    <EMSidebarNavItem key={1} name="Öğrenci Yönetimi" to="/students" />,
  ];
  const clasroomChildrens = [
    <EMSidebarNavItem key={2} name="Sınıf Yönetimi" to="/classrooms" />,
  ];
  const lessonChildrens = [
    <EMSidebarNavItem key={3} name="Ders Yönetimi" to="/lessons" />,
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

        <EMSidebarNavTitle children={["Öğretmen"]} />
        <EMSidebarNavDropdown
          name="Öğretmenler"
          route="/teachers"
          icon="teacher-sidebar-icon"
          children={teacherChildrens}
        />

        <EMSidebarNavTitle children={["Öğrenci"]} />
        <EMSidebarNavDropdown
          name="Öğrenciler"
          route="/students"
          icon="student-sidebar-icon"
          children={studentChildrens}
        />

        <EMSidebarNavTitle children={["Sınıf"]} />
        <EMSidebarNavDropdown
          name="Sınıflar"
          route="/clasrooms"
          icon="classroom-sidebar-icon"
          children={clasroomChildrens}
        />
        <EMSidebarNavTitle children={["Ders"]} />
        <EMSidebarNavDropdown
          name="Dersler"
          route="/lessons"
          icon="cil-pencil"
          children={lessonChildrens}
        />
      </EMSidebarNav>
      <EMSidebarMinimizer className="c-d-md-down-none" />
    </EMSidebar>
  );
};

export default React.memo(LayoutSidebar);
