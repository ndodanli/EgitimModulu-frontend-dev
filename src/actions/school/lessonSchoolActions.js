import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/school/lessonConstants";
import { NUM_OF_LESSONS_IN_PAGE } from "../../constants/generalConstants";
import {
  addUpdateTime,
  getDateNow,
  getTimeNow,
} from "../../utilities/dateControl";

const getLessonsSchool = (params, page, count, query) => async (dispatch) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_LESSONS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_LESSONS_REQUEST_SCHOOL });
    const { data } = await authRequest.get(
      "/api/school/lesson/?page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({ type: ACTIONS.GET_LESSONS_SUCCESS_SCHOOL, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_LESSONS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const postLessonSchool = (lessonDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_LESSONS_REQUEST_SCHOOL });
    const { data } = await authRequest.post("/api/school/lesson", lessonDto);
    lessonDto["id"] = data;
    addUpdateTime(lessonDto);
    dispatch({
      type: ACTIONS.POST_LESSONS_SUCCESS_SCHOOL,
      payload: lessonDto,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_LESSONS_FAIL_SCHOOL,
      payload: error.response.data,
    });
    return false;
  }
};

const deleteLessonSchool = (lessonId, page, count, query) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.DELETE_LESSONS_REQUEST_SCHOOL });
    await authRequest.delete("/api/school/lesson/?lessonId=" + lessonId);
    dispatch(getLessonsSchool(null, page, count, query));
    dispatch({
      type: ACTIONS.DELETE_LESSONS_SUCCESS_SCHOOL,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_LESSONS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const putLessonSchool = (updatedProps, lessonDetail, id) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.PUT_LESSONS_REQUEST_SCHOOL });
    updatedProps["id"] = id;
    await authRequest.put("/api/school/lesson", updatedProps);
    const payload = { ...lessonDetail, ...updatedProps };
    addUpdateTime(payload);
    dispatch({
      type: ACTIONS.PUT_LESSONS_SUCCESS_SCHOOL,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_LESSONS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

export {
  getLessonsSchool,
  postLessonSchool,
  deleteLessonSchool,
  putLessonSchool,
};
