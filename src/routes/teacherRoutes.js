import React from "react";

const TeacherDashboardPage = React.lazy(() =>
  import("../pages/teacher_pages/teacher_dashboard/TeacherDashboardPage")
);
const TeacherProfilePage = React.lazy(() =>
  import("../pages/teacher_pages/teacher_profile/TeacherProfilePage")
);
const TeacherLessonPage = React.lazy(() =>
  import("../pages/teacher_pages/teacher_lesson/TeacherLessonPage")
);
const TeacherExamPage = React.lazy(() =>
  import("../pages/teacher_pages/teacher_exam/TeacherExamPage")
);
const TeacherHomeworkPage = React.lazy(() =>
  import("../pages/teacher_pages/teacher_homework/TeacherHomeworkPage")
);

const teacherRoutes = [
  {
    path: "/",
    exact: true,
    name: "Öğretmen Dashboard",
    component: TeacherDashboardPage,
  },
  {
    path: "/teacher-profile",
    name: "Öğretmen Profil",
    component: TeacherProfilePage,
  },
  {
    path: "/teacher-lessons",
    name: "Öğretmen Dersler",
    component: TeacherLessonPage,
  },
  {
    path: "/teacher-exams",
    name: "Öğretmen Sınavlar",
    component: TeacherExamPage,
  },
  {
    path: "/teacher-homeworks",
    name: "Öğretmen Ödevler",
    component: TeacherHomeworkPage,
  },
];

export default teacherRoutes;
