import React from "react";

const StudentPage = React.lazy(() =>
  import("../pages/school_pages/school_student/StudentPage")
);
const ClassroomPage = React.lazy(() =>
  import("../pages/school_pages/school_classroom/ClassroomPage")
);
const SchoolDashboardPage = React.lazy(() =>
  import("../pages/school_pages/school_dashboard/SchoolDashboardPage")
);
const TeacherPage = React.lazy(() =>
  import("../pages/school_pages/school_teacher/TeacherPage")
);
const LessonPage = React.lazy(() =>
  import("../pages/school_pages/school_lesson/LessonPage")
);
const SchoolProfilePage = React.lazy(() =>
  import("../pages/school_pages/school_profile/SchoolProfilePage")
);

const schoolRoutes = [
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    component: SchoolDashboardPage,
  },
  {
    path: "/students",
    name: "Öğrenci Yönetimi",
    component: StudentPage,
  },
  {
    path: "/teachers",
    name: "Öğretmen Yönetimi",
    component: TeacherPage,
  },
  {
    path: "/classrooms",
    name: "Sınıf Yönetimi",
    component: ClassroomPage,
  },
  {
    path: "/lessons",
    name: "Ders Yönetimi",
    component: LessonPage,
  },
  {
    path: "/school-profile",
    name: "Kurum Profili",
    component: SchoolProfilePage,
  },
];

export default schoolRoutes;
