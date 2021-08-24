import React from "react";

const StudentHomePage = React.lazy(() =>
  import("../pages/student_pages/student_home/StudentHomePage")
);

const studentRoutes = [
  {
    path: "/",
    exact: true,
    name: "Öğrenci Anasayfa",
    component: StudentHomePage,
  },
];

export default studentRoutes;
