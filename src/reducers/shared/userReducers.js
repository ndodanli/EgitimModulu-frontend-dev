import * as ACTIONS from "../../constants/shared/userConstants";
function userDetailsReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.USER_DETAILS_REQUEST:
      return {
        ...state,
        loadingDetail: true,
      };
    case ACTIONS.USER_DETAILS_SUCCESS:
      return {
        ...state,
        error: undefined,
        loadingDetail: false,
        userInfo: action.payload,
      };
    case ACTIONS.USER_DETAILS_FAIL:
      return { ...state, loadingDetail: false, error: action.payload };
    case ACTIONS.USER_AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.USER_AUTHENTICATE_FAIL:
      return { ...state, loading: false, errorAuth: action.payload };
    case ACTIONS.USER_DETAILS_UPDATE:
      return { ...state, loadingDetail: false, userInfo: action.payload };
    case ACTIONS.PUT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case ACTIONS.PUT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
        error: undefined,
      };
    case ACTIONS.PUT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ACTIONS.CLEAN_AUTH:
      return {
        ...state,
        loading: undefined,
        errorAuth: undefined,
      };
    default:
      return state;
  }
}
function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.USER_REGISTER_SUCCESS:
      return {
        loading: false,
        //güncellenecek
        success: true,
      };
    case ACTIONS.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function userLogoutReducer(state = {}, action) {
  switch (action.type) {
    case ACTIONS.USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        //güncellenecek
        success: action.payload,
      };
    case ACTIONS.USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { userDetailsReducer, userRegisterReducer, userLogoutReducer };
