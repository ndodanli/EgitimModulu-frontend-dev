import React from "react";
import LayoutFooter from "../../layouts/components/teacher_layout_components/footer/LayoutFooter";
import LayoutHeader from "../../layouts/components/teacher_layout_components/header/LayoutHeader";
import LayoutSidebar from "../../layouts/components/teacher_layout_components/sidebar/LayoutSidebar";
import TeacherContent from "./TeacherContent";
function TeacherLayout() {
  return (
    <div className="c-app c-default-layout">
      <LayoutSidebar />
      <div className="c-wrapper">
        <LayoutHeader />
        <div className="c-body">
          <TeacherContent />
        </div>
        <LayoutFooter />
      </div>
    </div>
  );
}

export default TeacherLayout;
