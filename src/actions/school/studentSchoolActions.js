import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/school/studentConstants";
import { NUM_OF_STUDENTS_IN_PAGE } from "../../constants/generalConstants";
import { addUpdateTime } from "../../utilities/dateControl";
import { updateProps } from "../../utilities/form/validation/updateProps";

const getStudentsSchool = (params, page, count, query) => async (dispatch) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_STUDENTS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_STUDENTS_REQUEST_SCHOOL });
    const { data } = await authRequest.get(
      "/api/school/student/?page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({
      type: ACTIONS.GET_STUDENTS_SUCCESS_SCHOOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_STUDENTS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const postStudentSchool = (studentDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_STUDENTS_REQUEST_SCHOOL });
    const { data } = await authRequest.post("/api/school/student", studentDto);
    studentDto["id"] = data;
    addUpdateTime(studentDto);
    dispatch({
      type: ACTIONS.POST_STUDENTS_SUCCESS_SCHOOL,
      payload: studentDto,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_STUDENTS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const putStudentSchool = (updatedProps, studentDetail, id) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.PUT_STUDENTS_REQUEST_SCHOOL });
    updatedProps["id"] = id;
    await authRequest.put("/api/school/student", updatedProps);
    const payload = { ...studentDetail, ...updatedProps };
    addUpdateTime(payload);
    dispatch({
      type: ACTIONS.PUT_STUDENTS_SUCCESS_SCHOOL,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_STUDENTS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const deleteStudentSchool = (studentId, page, count, query) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ACTIONS.DELETE_STUDENTS_REQUEST_SCHOOL,
    });
    await authRequest.delete("api/school/student/?studentId=" + studentId);
    dispatch(getStudentsSchool(null, page, count, query));
    dispatch({
      type: ACTIONS.DELETE_STUDENTS_SUCCESS_SCHOOL,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_STUDENTS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

export {
  getStudentsSchool,
  postStudentSchool,
  putStudentSchool,
  deleteStudentSchool,
};
