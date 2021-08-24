import * as ACTIONS from "../../constants/teacher/lessonConstants";
import { NUM_OF_LESSONS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

const lessonTeacherReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_LESSONS_REQUEST_TEACHER:
      return { ...state, loadingGet: true };
    case ACTIONS.GET_LESSONS_SUCCESS_TEACHER:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        lessons: action.payload.lessons,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_LESSONS_FAIL_TEACHER:
      return { ...state, loadingGet: false, errorGet: action.payload };
    // case ACTIONS.POST_LESSONS_REQUEST_TEACHER:
    //   return { ...state, loading: true };
    // case ACTIONS.POST_LESSONS_SUCCESS_TEACHER:
    //   if (
    //     isOnLastPage(
    //       state.totalItemCount,
    //       state.lessons.length,
    //       NUM_OF_LESSONS_IN_PAGE
    //     )
    //   ) {
    //     return {
    //       error: undefined,
    //       loading: false,
    //       lessons: [...state.lessons, action.payload],
    //       totalItemCount: state.totalItemCount + 1,
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       error: undefined,
    //       loading: false,
    //       totalItemCount: state.totalItemCount + 1,
    //     };
    //   }
    // case ACTIONS.POST_LESSONS_FAIL_TEACHER:
    //   return { ...state, loading: false, error: action.payload };
    // case ACTIONS.PUT_LESSONS_REQUEST_TEACHER:
    //   return { ...state, loading: true };
    // case ACTIONS.PUT_LESSONS_SUCCESS_TEACHER:
    //   return {
    //     ...state,
    //     error: undefined,
    //     loading: false,
    //     lessons: [
    //       ...state.lessons.map((lesson) => {
    //         if (lesson.id !== action.payload.id) {
    //           return lesson;
    //         } else {
    //           return action.payload;
    //         }
    //       }),
    //     ],
    //   };
    // case ACTIONS.PUT_LESSONS_FAIL_TEACHER:
    //   return { ...state, loading: false, error: action.payload };
    // case ACTIONS.DELETE_LESSONS_REQUEST_TEACHER:
    //   return { ...state, loading: true };
    // case ACTIONS.DELETE_LESSONS_SUCCESS_TEACHER:
    //   return {
    //     ...state,
    //     loading: undefined,
    //     error: false,
    //   };
    // case ACTIONS.DELETE_LESSONS_FAIL_TEACHER:
    //   return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export { lessonTeacherReducer };
