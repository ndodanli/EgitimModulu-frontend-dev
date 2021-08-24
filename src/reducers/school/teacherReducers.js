import * as ACTIONS from "../../constants/school/teacherConstants";
import { NUM_OF_TEACHERS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

function getTeacherListSchoolReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_TEACHERLIST_REQUEST_SCHOOL:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_TEACHERLIST_SUCCESS_SCHOOL:
      return {
        ...state,
        error: undefined,
        loading: false,
        teachers: action.payload,
      };
    case ACTIONS.GET_TEACHERLIST_FAIL_SCHOOL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

function teacherSchoolReducer(state = {}, action = {}) {
  switch (action.type) {
    case ACTIONS.GET_TEACHERS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingGet: true,
      };
    case ACTIONS.GET_TEACHERS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        teachers: action.payload.teachers,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_TEACHERS_FAIL_SCHOOL:
      return {
        ...state,
        loadingGet: false,
        errorGet: action.payload,
      };
    case ACTIONS.POST_TEACHERS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingPost: true,
      };
    case ACTIONS.POST_TEACHERS_SUCCESS_SCHOOL:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.teachers.length,
          NUM_OF_TEACHERS_IN_PAGE
        )
      ) {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          teachers: [...state.teachers, action.payload],
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
    case ACTIONS.POST_TEACHERS_FAIL_SCHOOL:
      return {
        ...state,
        loadingPost: false,
        errorPost: action.payload,
      };
    case ACTIONS.PUT_TEACHERS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingPut: true,
      };
    case ACTIONS.PUT_TEACHERS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        teachers: [
          ...state.teachers.map((teacher) => {
            if (teacher.id !== action.payload.id) {
              return teacher;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_TEACHERS_FAIL_SCHOOL:
      return {
        ...state,
        loadingPut: false,
        errorPut: action.payload,
      };
    case ACTIONS.DELETE_TEACHERS_REQUEST_SCHOOL:
      return {
        ...state,
        loadingDelete: true,
      };
    case ACTIONS.DELETE_TEACHERS_SUCCESS_SCHOOL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: undefined,
        totalItemCount: state.totalItemCount - 1,
      };
    case ACTIONS.DELETE_TEACHERS_FAIL_SCHOOL:
      return {
        ...state,
        loadingDelete: false,
        errorDelete: action.payload,
      };
    case ACTIONS.CLEAN_TEACHERS_SCHOOL:
      return {
        ...state,
        teachers: undefined,
      };
    default:
      return state;
  }
}

export { getTeacherListSchoolReducer, teacherSchoolReducer };
