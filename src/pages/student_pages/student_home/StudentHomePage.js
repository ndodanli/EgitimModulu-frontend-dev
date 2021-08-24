import React from "react";
import { EMCol, EMRow } from "../../../components";
import HomeJumbotron from "../../../layouts/components/student_layout_components/middle/HomeJumbotron";
import RightSideMenu from "../../../layouts/components/student_layout_components/sidebar/RightSideMenu";

function StudentHomePage() {
  return (
    <EMRow>
      <EMCol md="9">
        <HomeJumbotron />
      </EMCol>
      <EMCol md="3">
        <RightSideMenu />
      </EMCol>
    </EMRow>
  );
}

export default StudentHomePage;
