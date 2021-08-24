import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/teacher/examConstants";
import { NUM_OF_EXAMS_IN_PAGE } from "../../constants/generalConstants";
import {
  addUpdateTime,
  getDateNow,
  getTimeNow,
} from "../../utilities/dateControl";

const getExamsTeacher = (params, page, count, query) => async (dispatch) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_EXAMS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_EXAMS_REQUEST_TEACHER });
    const { data } = await authRequest.get(
      "/api/teacher/exam/?lessonId=" +
        params.lessonId +
        "&page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({ type: ACTIONS.GET_EXAMS_SUCCESS_TEACHER, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_EXAMS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

const postExamTeacher = (examDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_EXAMS_REQUEST_TEACHER });
    const formData = new FormData();

    for (var key in examDto) {
      formData.append(key, examDto[key]);
    }
    console.log(`examDto`, examDto);
    const { data } = await authRequest.post("/api/teacher/exam", formData);
    examDto["id"] = data;
    addUpdateTime(examDto);
    dispatch({
      type: ACTIONS.POST_EXAMS_SUCCESS_TEACHER,
      payload: examDto,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_EXAMS_FAIL_TEACHER,
      payload: error.response.data,
    });
    return false;
  }
};

const deleteExamTeacher = (examId, page, count, query, lessonId) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.DELETE_EXAMS_REQUEST_TEACHER });
    await authRequest.delete("/api/teacher/exam/?examId=" + examId);
    dispatch(getExamsTeacher({ lessonId: lessonId }, page, count, query));
    dispatch({
      type: ACTIONS.DELETE_EXAMS_SUCCESS_TEACHER,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_EXAMS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

const putExamTeacher = (updatedProps, examDetail, id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.PUT_EXAMS_REQUEST_TEACHER });
    updatedProps["id"] = id;
    const formData = new FormData();

    for (var key in updatedProps) {
      formData.append(key, updatedProps[key]);
    }
    await authRequest.put("/api/teacher/exam", formData);
    const payload = { ...examDetail, ...updatedProps };
    console.log(`payload`, payload);
    // addUpdateTime(payload);
    dispatch({
      type: ACTIONS.PUT_EXAMS_SUCCESS_TEACHER,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_EXAMS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

export { getExamsTeacher, postExamTeacher, deleteExamTeacher, putExamTeacher };
