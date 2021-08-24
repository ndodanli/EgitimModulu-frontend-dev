import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/school/classRoomConstants";
import { NUM_OF_CLASSROOMS_IN_PAGE } from "../../constants/generalConstants";
import { addUpdateTime } from "../../utilities/dateControl";

const getClassroomListSchool = () => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.GET_CLASSROOMLIST_REQUEST_SCHOOL });
    const { data } = await authRequest.get("/api/school/classroom/list");
    dispatch({
      type: ACTIONS.GET_CLASSROOMLIST_SUCCESS_SCHOOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_CLASSROOMLIST_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const getClassroomsSchool = (params, page, count, query) => async (
  dispatch
) => {
  try {
    if (!page) page = 1;
    if (!count) count = NUM_OF_CLASSROOMS_IN_PAGE;
    dispatch({ type: ACTIONS.GET_CLASSROOMS_REQUEST_SCHOOL });
    const { data } = await authRequest.get(
      "/api/school/classroom/?page=" +
        page +
        "&count=" +
        count +
        (query ? "&query=" + query : "")
    );
    dispatch({
      type: ACTIONS.GET_CLASSROOMS_SUCCESS_SCHOOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_CLASSROOMS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const postClassRoomSchool = (classroomDto) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.POST_CLASSROOMS_REQUEST_SCHOOL });
    const { data } = await authRequest.post(
      "api/school/classroom",
      classroomDto
    );
    classroomDto["id"] = data;
    addUpdateTime(classroomDto);
    dispatch({
      type: ACTIONS.POST_CLASSROOMS_SUCCESS_SCHOOL,
      payload: classroomDto,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ACTIONS.POST_CLASSROOMS_FAIL_SCHOOL,
      payload: error.response.data,
    });
    return false;
  }
};

const deleteClassRoomSchool = (classroomId, page, count, query) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.DELETE_CLASSROOMS_REQUEST_SCHOOL });
    await authRequest.delete(
      "api/school/classroom/?classroomId=" + classroomId
    );
    dispatch(getClassroomsSchool(null, page, count, query));
    dispatch({
      type: ACTIONS.DELETE_CLASSROOMS_SUCCESS_SCHOOL,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.DELETE_CLASSROOMS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

const putClassRoomSchool = (updatedProps, classroomDetail, id) => async (
  dispatch
) => {
  try {
    dispatch({ type: ACTIONS.PUT_CLASSROOMS_REQUEST_SCHOOL });
    updatedProps["id"] = id;
    await authRequest.put("api/school/classroom", updatedProps);
    const payload = { ...classroomDetail, ...updatedProps };
    addUpdateTime(updatedProps);
    dispatch({
      type: ACTIONS.PUT_CLASSROOMS_SUCCESS_SCHOOL,
      payload: payload,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_CLASSROOMS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

export {
  getClassroomListSchool,
  getClassroomsSchool,
  postClassRoomSchool,
  deleteClassRoomSchool,
  putClassRoomSchool,
};
