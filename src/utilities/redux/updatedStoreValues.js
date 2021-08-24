import { initialStoreValues } from "./initialStoreValues";

export const getUpdatedStoreValues = (state) => {
  return {
    ...state,
    //general
    toggleDetails: initialStoreValues.toggleDetails,
    //account
    userRegister: { ...state.userRegister, success: undefined },
    userLogout: { ...state.userLogout, success: undefined },
  };
};
