import React from "react";

const HomePage = React.lazy(() =>
  import("../pages/without_auth_pages/HomePage")
);
const SchoolLoginPage = React.lazy(() =>
  import("../pages/without_auth_pages/login_pages/SchoolLoginPage")
);
const TeacherLoginPage = React.lazy(() =>
  import("../pages/without_auth_pages/login_pages/TeacherLoginPage")
);
const StudentLoginPage = React.lazy(() =>
  import("../pages/without_auth_pages/login_pages/StudentLoginPage")
);
const SchoolSignupPage = React.lazy(() =>
  import("../pages/without_auth_pages/SchoolSignupPage")
);

const withoutAuthRoutes = [
  {
    path: "/",
    exact: true,
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/school-login",
    name: "SchoolLoginPage",
    component: SchoolLoginPage,
  },
  {
    path: "/teacher-login",
    name: "TeacherLoginPage",
    component: TeacherLoginPage,
  },
  {
    path: "/student-login",
    name: "TeacherLoginPage",
    component: StudentLoginPage,
  },
  {
    path: "/school-signup",
    name: "SchoolSignupPage",
    component: SchoolSignupPage,
  },
];

export default withoutAuthRoutes;
