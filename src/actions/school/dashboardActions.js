import { axiosApiInstance as authRequest } from "../../utilities/auth/axiosInterceptors";
import * as ACTIONS from "../../constants/school/dashboardConstants";

const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch({ type: ACTIONS.GET_DASHBOARDSTATS_REQUEST_SCHOOL });
    const { data } = await authRequest.get("/api/school/dashboard");
    dispatch({
      type: ACTIONS.GET_DASHBOARDSTATS_SUCCESS_SCHOOL,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.GET_DASHBOARDSTATS_FAIL_SCHOOL,
      payload: error.response.data,
    });
  }
};

export { getDashboardStats };
