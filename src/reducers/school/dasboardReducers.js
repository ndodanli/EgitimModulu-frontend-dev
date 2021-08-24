import * as ACTIONS from "../../constants/school/dashboardConstants";

function dasboardStatsReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_DASHBOARDSTATS_REQUEST_SCHOOL:
      return {
        ...state,
        loading: true,
      };

    case ACTIONS.GET_DASHBOARDSTATS_SUCCESS_SCHOOL:
      return {
        ...state,
        error: undefined,
        loading: false,
        totalOnline: action.payload.totalOnline,
        totalStudent: action.payload.totalStudent,
        totalTeacher: action.payload.totalTeacher,
        totalActiveClassroom: action.payload.totalActiveClassroom,
      };

    case ACTIONS.GET_DASHBOARDSTATS_FAIL_SCHOOL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
export { dasboardStatsReducer };
