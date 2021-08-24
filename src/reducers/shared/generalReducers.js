import {
  ADDMODAL_UPDATE,
  CLEAR_INPUTS,
  SIDEBAR_SET,
  TOGGLE_UPDATE,
  UPDATEMODAL_UPDATE,
} from "../../constants/generalConstants";
import {
  CONTROLLED_INPUT_FAIL,
  CONTROLLED_INPUT_REQUEST,
  CONTROLLED_INPUT_SUCCESS,
} from "../../constants/shared/controlledInput";
function sidebarShowReducer(state = {}, action) {
  if (action.type === SIDEBAR_SET) {
    return action.payload;
  } else {
    return state;
  }
}
function toggleDetailsReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_UPDATE:
      return { ...state, details: action.payload };
    case ADDMODAL_UPDATE:
      return { ...state, addModal: !state.addModal };
    case UPDATEMODAL_UPDATE:
      return {
        ...state,
        updateModal: {
          status: !state.updateModal.status,
          id: action.payload.id,
          effectId: action.payload.effectId,
        },
      };
    case CLEAR_INPUTS:
      return {
        ...state,
        clearInputs: {
          status: action.payload !== undefined ? action.payload : true,
        },
      };
    default:
      return state;
  }
}
function controlledInputReducer(state = {}, action) {
  switch (action.type) {
    case CONTROLLED_INPUT_REQUEST:
      return { ...state, loading: true };
    case CONTROLLED_INPUT_SUCCESS:
      return {
        ...state,
        error: undefined,
        loading: false,
        ...action.payload,
      };
    case CONTROLLED_INPUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
export { sidebarShowReducer, toggleDetailsReducer, controlledInputReducer };
