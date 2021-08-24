import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/teacher/homeworkConstants";
import { NUM_OF_HOMEWORKS_IN_PAGE } from "../../constants/generalConstants";
import {
  addUpdateTime,
  getDateNow,
  getTimeNow,
} from "../../utilities/dateControl";

const getHomeworksTeacher = (params, page, count, query) => async (
  dispatch
) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_HOMEWORKS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_HOMEWORKS_REQUEST_TEACHER });
    const { data } = await authRequest.get(
      "/api/teacher/homework/?lessonId=" +
        params.lessonId +
        "&page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({ type: ACTIONS.GET_HOMEWORKS_SUCCESS_TEACHER, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_HOMEWORKS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

const postHomeworkTeacher = (homeworkDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_HOMEWORKS_REQUEST_TEACHER });
    const formData = new FormData();

    for (var key in homeworkDto) {
      formData.append(key, homeworkDto[key]);
    }
    const { data } = await authRequest.post("/api/teacher/homework", formData);
    homeworkDto["id"] = data;
    addUpdateTime(homeworkDto);
    dispatch({
      type: ACTIONS.POST_HOMEWORKS_SUCCESS_TEACHER,
      payload: homeworkDto,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_HOMEWORKS_FAIL_TEACHER,
      payload: error.response.data,
    });
    return false;
  }
};

const deleteHomeworkTeacher = (
  homeworkId,
  page,
  count,
  query,
  lessonId
) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.DELETE_HOMEWORKS_REQUEST_TEACHER });
    await authRequest.delete("/api/teacher/homework/?homeworkId=" + homeworkId);
    dispatch(getHomeworksTeacher({ lessonId: lessonId }, page, count, query));
    dispatch({
      type: ACTIONS.DELETE_HOMEWORKS_SUCCESS_TEACHER,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_HOMEWORKS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

const putHomeworkTeacher = (updatedProps, homeworkDetail, id) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.PUT_HOMEWORKS_REQUEST_TEACHER });

    updatedProps["id"] = id;
    const formData = new FormData();

    for (var key in updatedProps) {
      formData.append(key, updatedProps[key]);
    }
    console.log(`formData`, formData);
    await authRequest.put("/api/teacher/homework", formData);
    const payload = { ...homeworkDetail, ...updatedProps };
    console.log(`payload`, payload);
    // addUpdateTime(payload);
    dispatch({
      type: ACTIONS.PUT_HOMEWORKS_SUCCESS_TEACHER,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_HOMEWORKS_FAIL_TEACHER,
      payload: error.response.data,
    });
  }
};

export {
  getHomeworksTeacher,
  postHomeworkTeacher,
  deleteHomeworkTeacher,
  putHomeworkTeacher,
};
