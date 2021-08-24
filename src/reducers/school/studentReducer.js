import { NUM_OF_STUDENTS_IN_PAGE } from "../../constants/generalConstants";
import * as ACTIONS from "../../constants/school/studentConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

function studentSchoolReducer(state = [], action) {
  switch (action.type) {
    case ACTIONS.GET_STUDENTS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingGet: true,
      };
    case ACTIONS.GET_STUDENTS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        students: action.payload.students,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_STUDENTS_FAIL_SCHOOL:
      return {
        ...state,
        loadingGet: false,
        errorGet: action.payload,
      };
    case ACTIONS.POST_STUDENTS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingPost: true,
      };
    case ACTIONS.POST_STUDENTS_SUCCESS_SCHOOL:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.students.length,
          NUM_OF_STUDENTS_IN_PAGE
        )
      ) {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          students: [...state.students, action.payload],
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
    case ACTIONS.POST_STUDENTS_FAIL_SCHOOL:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload,
      };
    case ACTIONS.PUT_STUDENTS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingPut: true,
      };
    case ACTIONS.PUT_STUDENTS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        students: [
          ...state.students.map((student) => {
            if (student.id !== action.payload.id) {
              return student;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_STUDENTS_FAIL_SCHOOL:
      return {
        ...state,
        loadingPut: false,
        errorPut: action.payload,
      };
    case ACTIONS.DELETE_STUDENTS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingDelete: true,
      };
    case ACTIONS.DELETE_STUDENTS_SUCCESS_SCHOOL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: undefined,
      };
    case ACTIONS.DELETE_STUDENTS_FAIL_SCHOOL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
      };
    case ACTIONS.CLEAN_STUDENTS_SCHOOL:
      return {
        ...state,
        students: undefined,
      };
    default:
      return state;
  }
}
export { studentSchoolReducer };
