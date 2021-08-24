import * as ACTIONS from "../../constants/teacher/homeworkConstants";
import { NUM_OF_HOMEWORKS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

const homeworkTeacherReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_HOMEWORKS_REQUEST_TEACHER:
      return { ...state, loadingGet: true };
    case ACTIONS.GET_HOMEWORKS_SUCCESS_TEACHER:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        homeworks: action.payload.homeworks,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_HOMEWORKS_FAIL_TEACHER:
      return { ...state, loadingGet: false, errorGet: action.payload };
    case ACTIONS.POST_HOMEWORKS_REQUEST_TEACHER:
      return { ...state, loadingPost: true };
    case ACTIONS.POST_HOMEWORKS_SUCCESS_TEACHER:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.homeworks.length,
          NUM_OF_HOMEWORKS_IN_PAGE
        )
      ) {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          homeworks: [...state.homeworks, action.payload],
          totalItemCount: state.totalItemCount + 1,
        };
      } else {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          totalItemCount: state.totalItemCount + 1,
        };
      }
    case ACTIONS.POST_HOMEWORKS_FAIL_TEACHER:
      return { ...state, loadingPost: false, errorPost: action.payload };
    case ACTIONS.PUT_HOMEWORKS_REQUEST_TEACHER:
      return { ...state, loadingPut: true };
    case ACTIONS.PUT_HOMEWORKS_SUCCESS_TEACHER:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        homeworks: [
          ...state.homeworks.map((exam) => {
            if (exam.id !== action.payload.id) {
              return exam;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_HOMEWORKS_FAIL_TEACHER:
      return { ...state, loadingPut: false, errorPut: action.payload };
    case ACTIONS.DELETE_HOMEWORKS_REQUEST_TEACHER:
      return { ...state, loadingDelete: true };
    case ACTIONS.DELETE_HOMEWORKS_SUCCESS_TEACHER:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: undefined,
      };
    case ACTIONS.DELETE_HOMEWORKS_FAIL_TEACHER:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    case ACTIONS.CLEAN_HOMEWORKS_TEACHER:
      return {
        ...state,
        homeworks: undefined,
      };
    default:
      return state;
  }
};

export { homeworkTeacherReducer };
