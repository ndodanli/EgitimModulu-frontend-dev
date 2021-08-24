import * as ACTIONS from "../../constants/school/lessonConstants";
import { NUM_OF_LESSONS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

const lessonSchoolReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_LESSONS_REQUEST_SCHOOL:
      return { ...state, loadingGet: true };
    case ACTIONS.GET_LESSONS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        lessons: action.payload.lessons,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_LESSONS_FAIL_SCHOOL:
      return { ...state, loadingGet: false, errorGet: action.payload };
    case ACTIONS.POST_LESSONS_REQUEST_SCHOOL:
      return { ...state, loadingPost: true };
    case ACTIONS.POST_LESSONS_SUCCESS_SCHOOL:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.lessons.length,
          NUM_OF_LESSONS_IN_PAGE
        )
      ) {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          lessons: [...state.lessons, action.payload],
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
    case ACTIONS.POST_LESSONS_FAIL_SCHOOL:
      return { ...state, loadingPost: false, errorPost: action.payload };
    case ACTIONS.PUT_LESSONS_REQUEST_SCHOOL:
      return { ...state, loadingPut: true };
    case ACTIONS.PUT_LESSONS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        lessons: [
          ...state.lessons.map((lesson) => {
            if (lesson.id !== action.payload.id) {
              return lesson;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_LESSONS_FAIL_SCHOOL:
      return { ...state, loadingPut: false, errorPut: action.payload };
    case ACTIONS.DELETE_LESSONS_REQUEST_SCHOOL:
      return { ...state, loadingDelete: true };
    case ACTIONS.DELETE_LESSONS_SUCCESS_SCHOOL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: undefined,
      };
    case ACTIONS.DELETE_LESSONS_FAIL_SCHOOL:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    case ACTIONS.CLEAN_LESSONS_SCHOOL:
      return { ...state, lessons: undefined };
    default:
      return state;
  }
};

export { lessonSchoolReducer };
