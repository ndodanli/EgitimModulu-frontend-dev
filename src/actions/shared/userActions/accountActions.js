import * as ACTIONS from "../../../constants/shared/userConstants";
import Axios from "axios";
import { axiosApiInstance as authRequest } from "../../../utilities/auth/axiosInterceptors";
import { push } from "connected-react-router";

const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.USER_DETAILS_REQUEST });
    const { data } = await authRequest.get("api/account/getuser?info=true");
    dispatch({ type: ACTIONS.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.USER_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};

const authUser = (formInputs, accountType = -1) => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.USER_AUTHENTICATE_REQUEST });
    const { data } = await Axios.post("api/account/authenticate", {
      ...formInputs,
      accountType,
    });
    dispatch(push("/"));
    dispatch({ type: ACTIONS.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.USER_AUTHENTICATE_FAIL,
      payload: error.response.data,
    });
  }
};

const registerUser = (registerModel) => async (dispatch) => {
  dispatch({ type: ACTIONS.USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post("api/account/register", {
      ...registerModel,
    });
    dispatch({ type: ACTIONS.USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.USER_REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.USER_LOGOUT_REQUEST });
    const { data } = await Axios.post("api/account/logout");
    dispatch({ type: ACTIONS.USER_DETAILS_UPDATE, payload: undefined });
    dispatch(push("/"));
    dispatch({ type: ACTIONS.USER_LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ACTIONS.USER_LOGOUT_FAIL,
      payload: error.response.data,
    });
  }
};

export { getUserDetails, authUser, registerUser, logoutUser };
