import React, { useEffect } from "react";
import SchoolContent from "./SchoolContent";
import LayoutFooter from "../../layouts/components/school_layout_components/footer/LayoutFooter";
import LayoutHeader from "../../layouts/components/school_layout_components/header/LayoutHeader";
import LayoutSidebar from "../../layouts/components/school_layout_components/sidebar/LayoutSidebar";
function SchoolLayout() {
  return (
    <div className="c-app c-default-layout">
      <LayoutSidebar />
      <div className="c-wrapper">
        <LayoutHeader />
        <div className="c-body">
          <SchoolContent />
        </div>
        <LayoutFooter />
      </div>
    </div>
 
  );
}

export default SchoolLayout;
