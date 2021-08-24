import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
//account
import {
  userDetailsReducer,
  userLogoutReducer,
  userRegisterReducer,
} from "../reducers/shared/userReducers";
//general
import {
  sidebarShowReducer,
  toggleDetailsReducer,
  controlledInputReducer,
} from "../reducers/shared/generalReducers";
//school
import {
  classroomSchoolReducer,
  getClassroomListSchoolReducer,
} from "../reducers/school/classroomReducers";
import {
  teacherSchoolReducer,
  getTeacherListSchoolReducer,
} from "../reducers/school/teacherReducers";
import { lessonSchoolReducer } from "../reducers/school/lessonReducers";
import { studentSchoolReducer } from "../reducers/school/studentReducer";
import { dasboardStatsReducer } from "../reducers/school/dasboardReducers";
//teacher
import { lessonTeacherReducer } from "../reducers/teacher/lessonReducers";
import { examTeacherReducer } from "../reducers/teacher/examReducers";
import { homeworkTeacherReducer } from "../reducers/teacher/homeworkReducers";
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    sidebarShow: sidebarShowReducer,
    toggleDetails: toggleDetailsReducer,
    controlledInput: controlledInputReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userLogout: userLogoutReducer,
    classroomSchool: classroomSchoolReducer,
    classroomListSchool: getClassroomListSchoolReducer,
    lessonSchool: lessonSchoolReducer,
    teacherListSchool: getTeacherListSchoolReducer,
    teacherSchool: teacherSchoolReducer,
    studentSchool: studentSchoolReducer,
    dashboardStats: dasboardStatsReducer,
    lessonTeacher: lessonTeacherReducer,
    examTeacher: examTeacherReducer,
    homeworkTeacher: homeworkTeacherReducer,
    //reducer'larımızı combine ettiğimiz kısım
  });
