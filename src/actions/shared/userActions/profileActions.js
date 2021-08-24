import * as ACTIONS from "../../../constants/shared/userConstants";
import { axiosApiInstance as authRequest } from "../../../utilities/auth/axiosInterceptors";

const putTeacherProfile = (teacherProfileDto, id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.PUT_PROFILE_REQUEST });
    teacherProfileDto["id"] = id;
    await authRequest.put("api/teacher/teacheracc/profile", teacherProfileDto);
    //   addUpdateTime(classroomModel);
    dispatch({
      type: ACTIONS.PUT_PROFILE_SUCCESS,
      payload: teacherProfileDto,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};

const putSchoolProfile = (schoolProfileDto, id) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.PUT_PROFILE_REQUEST });
    schoolProfileDto["id"] = id;
    await authRequest.put("api/school/schoolacc/profile", schoolProfileDto);
    //   addUpdateTime(classroomModel);
    dispatch({
      type: ACTIONS.PUT_PROFILE_SUCCESS,
      payload: schoolProfileDto,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.PUT_PROFILE_FAIL,
      payload: error.response.data,
    });
  }
};
export { putTeacherProfile, putSchoolProfile };
