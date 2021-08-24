import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/school/teacherConstants";
import { NUM_OF_TEACHERS_IN_PAGE } from "../../constants/generalConstants";
import { updateProps } from "../../utilities/form/validation/updateProps";

const getTeacherListSchool = () => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.GET_TEACHERLIST_REQUEST_SCHOOL });
    const { data } = await authRequest.get("/api/school/teacher/list");
    dispatch({
      type: ACTIONS.GET_TEACHERLIST_SUCCESS_SCHOOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_TEACHERLIST_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const getTeachersSchool = (params, page, count, query) => async (dispatch) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_TEACHERS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_TEACHERS_REQUEST_SCHOOL });
    const { data } = await authRequest.get(
      "/api/school/teacher/?page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({ type: ACTIONS.GET_TEACHERS_SUCCESS_SCHOOL, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_TEACHERS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const postTeacherSchool = (teacherDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_TEACHERS_REQUEST_SCHOOL });
    const { data } = await authRequest.post("/api/school/teacher", {
      ...teacherDto,
    });
    teacherDto["id"] = data;
    dispatch({
      type: ACTIONS.POST_TEACHERS_SUCCESS_SCHOOL,
      payload: teacherDto,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_TEACHERS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const deleteTeacherSchool = (teacherId, page, count, query) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.DELETE_TEACHERS_REQUEST_SCHOOL });
    await authRequest.delete("/api/school/teacher/?teacherId=" + teacherId);
    dispatch(getTeachersSchool(null, page, count, query));
    dispatch({ type: ACTIONS.DELETE_TEACHERS_SUCCESS_SCHOOL });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_TEACHERS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const putTeacherSchool = (updatedProps, teacherDetail, id) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.PUT_TEACHERS_REQUEST_SCHOOL });
    updatedProps["id"] = id;
    await authRequest.put("/api/school/teacher", updatedProps);
    const payload = { ...teacherDetail, ...updatedProps };
    dispatch({
      type: ACTIONS.PUT_TEACHERS_SUCCESS_SCHOOL,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_TEACHERS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

export {
  getTeacherListSchool,
  getTeachersSchool,
  postTeacherSchool,
  deleteTeacherSchool,
  putTeacherSchool,
};
