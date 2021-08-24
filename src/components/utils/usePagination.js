import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { TOGGLE_UPDATE } from "../../constants/generalConstants";

function usePagination() {
  const dispatch = useDispatch();
  const getPage = () => {
    const currentPage = Number(
      new URLSearchParams(window.location.search).get("page")
    );
    return currentPage <= 0 ? 1 : currentPage;
  };
  const handlePageData = async (
    page,
    action,
    actionParameters,
    count,
    query
  ) => {
    if (actionParameters)
      dispatch(action(actionParameters, page, count, query));
    else dispatch(action(null, page, count, query));
    dispatch({ type: TOGGLE_UPDATE, payload: [] });
  };
  const pushPage = async (page, actionParameters) => {
    dispatch(push(setSearchParams(page, actionParameters)));
  };
  const setSearchParams = (page, actionParameters) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page <= 0 ? 1 : page);
    if (actionParameters?.inUrl) {
      for (const key in actionParameters) {
        if (Object.hasOwnProperty.call(actionParameters, key)) {
          if (key !== "inUrl") searchParams.set(key, actionParameters[key]);
        }
      }
    }
    return window.location.pathname + "?" + searchParams.toString();
  };
  return { handlePageData, pushPage, getPage, setSearchParams };
}

export default usePagination;
