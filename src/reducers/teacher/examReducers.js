import * as ACTIONS from "../../constants/teacher/examConstants";
import { NUM_OF_EXAMS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

const examTeacherReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_EXAMS_REQUEST_TEACHER:
      return { ...state, loadingGet: true };
    case ACTIONS.GET_EXAMS_SUCCESS_TEACHER:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        exams: action.payload.exams,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_EXAMS_FAIL_TEACHER:
      return { ...state, loadingGet: false, errorGet: action.payload };
    case ACTIONS.POST_EXAMS_REQUEST_TEACHER:
      return { ...state, loadingPost: true };
    case ACTIONS.POST_EXAMS_SUCCESS_TEACHER:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.exams.length,
          NUM_OF_EXAMS_IN_PAGE
        )
      ) {
        //...
        action.payload["totalTime"] = "00:00:00";
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          exams: [...state.exams, action.payload],
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
    case ACTIONS.POST_EXAMS_FAIL_TEACHER:
      return { ...state, loadingPost: false, errorPost: action.payload };
    case ACTIONS.PUT_EXAMS_REQUEST_TEACHER:
      return { ...state, loadingPut: true };
    case ACTIONS.PUT_EXAMS_SUCCESS_TEACHER:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        exams: [
          ...state.exams.map((exam) => {
            if (exam.id !== action.payload.id) {
              return exam;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_EXAMS_FAIL_TEACHER:
      return { ...state, loadingPut: false, errorPut: action.payload };
    case ACTIONS.DELETE_EXAMS_REQUEST_TEACHER:
      return { ...state, loadingDelete: true };
    case ACTIONS.DELETE_EXAMS_SUCCESS_TEACHER:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: undefined,
      };
    case ACTIONS.DELETE_EXAMS_FAIL_TEACHER:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    case ACTIONS.CLEAN_EXAMS_TEACHER:
      return {
        ...state,
        exams: undefined,
      };
    default:
      return state;
  }
};

export { examTeacherReducer };
