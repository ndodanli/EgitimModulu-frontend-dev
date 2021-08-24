import { useSelector, useDispatch } from "react-redux";
import {
  ADDMODAL_UPDATE,
  CLEAR_INPUTS,
  TOGGLE_UPDATE,
  UPDATEMODAL_UPDATE,
} from "../../constants/generalConstants";
function useToggle() {
  const dispatch = useDispatch();

  const { addModal, updateModal, details } = useSelector(
    (state) => state.toggleDetails
  );

  const addToggle = () => {
    if (addModal) dispatch({ type: CLEAR_INPUTS, payload: true });
    else dispatch({ type: CLEAR_INPUTS, payload: false });

    dispatch({ type: ADDMODAL_UPDATE });
  };

  const updateToggle = (id = 0, effectId = -1) => {
    dispatch({ type: CLEAR_INPUTS, payload: true });
    dispatch({
      type: UPDATEMODAL_UPDATE,
      payload: { id: id, effectId: effectId },
    });
  };

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    dispatch({ type: TOGGLE_UPDATE, payload: newDetails });
  };

  return {
    addToggle,
    updateToggle,
    toggleDetails,
    addModal,
    updateModal,
    details,
  };
}

export default useToggle;
