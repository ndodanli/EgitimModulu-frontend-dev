import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./actions/shared/userActions/accountActions";
import { Roles } from "./constants/shared/rolesEnum";
import SchoolLayout from "./layouts/school/SchoolLayout";
import StudentLayout from "./layouts/student/StudentLayout";
import TeacherLayout from "./layouts/teacher/TeacherLayout";
import WithoutAuthLayout from "./layouts/without-auth/WithoutAuthLayout";
function AuthControl(props) {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loadingDetail, userInfo } = userDetails;

  useEffect(() => {
    //user authenticated ise bilgiler userInfo'ya yüklenecek(redux)
    dispatch(getUserDetails());
  }, []);
  return loadingDetail === undefined || loadingDetail === true ? (
    //guncellenecek
    <div>AUTH LOADING.</div>
  ) : !userInfo?.id ? (
    <WithoutAuthLayout />
  ) : userInfo.role === Roles.School ? (
    <SchoolLayout />
  ) : userInfo.role === Roles.Student ? (
    <StudentLayout />
  ) : (
    userInfo.role === Roles.Teacher && <TeacherLayout />
  );
}

export default AuthControl;
