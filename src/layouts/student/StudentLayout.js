import React from "react";
import { EMCol, EMRow } from "../../components";
import LayoutFooter from "../../layouts/components/student_layout_components/footer/LayoutFooter";
import LayoutHeader from "../../layouts/components/student_layout_components/header/LayoutHeader";
import LeftSideMenu from "../components/student_layout_components/sidebar/LeftSideMenu";
import StudentContent from "./StudentContent";
function StudentLayout() {
  return (
    <div className="c-wrapper">
      <LayoutHeader />
      <div className="c-body pt-3 px-3">
        <EMRow>
          <EMCol md="2">
            <LeftSideMenu />
          </EMCol>
          <EMCol md="10">
            <StudentContent />
          </EMCol>
        </EMRow>
      </div>
      <LayoutFooter />
    </div>
  );
}
export default StudentLayout;
