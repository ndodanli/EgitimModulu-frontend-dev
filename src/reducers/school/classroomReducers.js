import * as ACTIONS from "../../constants/school/classRoomConstants";
import { NUM_OF_CLASSROOMS_IN_PAGE } from "../../constants/generalConstants";
import { isOnLastPage } from "../../utilities/generalUtilityMethods";

function getClassroomListSchoolReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_CLASSROOMLIST_REQUEST_SCHOOL:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_CLASSROOMLIST_SUCCESS_SCHOOL:
      return {
        ...state,
        error: undefined,
        loading: false,
        classrooms: action.payload,
      };
    case ACTIONS.GET_CLASSROOMLIST_FAIL_SCHOOL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const classroomSchoolReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case ACTIONS.GET_CLASSROOMS_REQUEST_SCHOOL:
      return { ...state, loadingGet: true };
    case ACTIONS.GET_CLASSROOMS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorGet: undefined,
        loadingGet: false,
        classrooms: action.payload.classrooms,
        totalItemCount: action.payload.totalItemCount,
      };
    case ACTIONS.GET_CLASSROOMS_FAIL_SCHOOL:
      return { ...state, loadingGet: false, errorGet: action.payload };
    case ACTIONS.POST_CLASSROOMS_REQUEST_SCHOOL:
      return { ...state, loadingPost: true };
    case ACTIONS.POST_CLASSROOMS_SUCCESS_SCHOOL:
      if (
        isOnLastPage(
          state.totalItemCount,
          state.classrooms.length,
          NUM_OF_CLASSROOMS_IN_PAGE
        )
      ) {
        return {
          ...state,
          errorPost: undefined,
          loadingPost: false,
          classrooms: [...state.classrooms, action.payload],
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
    case ACTIONS.POST_CLASSROOMS_FAIL_SCHOOL:
      return { ...state, loadingPost: false, errorPost: action.payload };
    case ACTIONS.PUT_CLASSROOMS_REQUEST_SCHOOL:
      return { ...state, loadingPut: true };
    case ACTIONS.PUT_CLASSROOMS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorPut: undefined,
        loadingPut: false,
        classrooms: [
          ...state.classrooms.map((classroom) => {
            if (classroom.id !== action.payload.id) {
              return classroom;
            } else {
              return action.payload;
            }
          }),
        ],
      };
    case ACTIONS.PUT_CLASSROOMS_FAIL_SCHOOL:
      return { ...state, loadingPut: false, errorPut: action.payload };
    case ACTIONS.DELETE_CLASSROOMS_REQUEST_SCHOOL:
      return { ...state, loadingDelete: true };
    case ACTIONS.DELETE_CLASSROOMS_SUCCESS_SCHOOL:
      return {
        ...state,
        errorDelete: undefined,
        loadingDelete: false,
      };
    case ACTIONS.DELETE_CLASSROOMS_FAIL_SCHOOL:
      return { ...state, loadingDelete: false, errorDelete: action.payload };
    case ACTIONS.CLEAN_CLASSROOMS_SCHOOL:
      return { ...state, classrooms: undefined };
    default:
      return state;
  }
};

export { getClassroomListSchoolReducer, classroomSchoolReducer };
