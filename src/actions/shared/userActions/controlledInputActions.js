import * as ACTIONS from "../../../constants/shared/controlledInput";
import { axiosApiInstance as authRequest } from "../../../utilities/auth/axiosInterceptors";

const checkIfLessonCodeExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get(
      "api/school/lesson/lessoncode/?lessonCode=" + value
    );
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { lessonCode: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

const checkIfSchoolUNExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get(
      "api/account/username/?username=" + value
    );
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { username: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

const checkIfSchoolEmailExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get(
      "api/account/email/?emailAddress=" + value
    );
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { emailAddress: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

const checkIfSchoolTelExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get("api/account/tel/?tel=" + value);
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { tel: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

const checkIfTeacherUNExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get(
      "api/school/teacher/username/?username=" + value
    );
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { username: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

const checkIfStudentUNExist = (value) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.CONTROLLED_INPUT_REQUEST });
    const { data } = await authRequest.get(
      "api/school/student/username/?username=" + value
    );
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_SUCCESS,
      payload: { username: data },
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.CONTROLLED_INPUT_FAIL,
      payload: error.response.data,
    });
  }
};

export {
  checkIfLessonCodeExist,
  checkIfSchoolUNExist,
  checkIfSchoolEmailExist,
  checkIfSchoolTelExist,
  checkIfTeacherUNExist,
  checkIfStudentUNExist,
};
