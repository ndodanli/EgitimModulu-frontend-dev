import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../actions/shared/userActions/accountActions";
import { USER_DETAILS_UPDATE } from "../../../../constants/shared/userConstants";
import {
  EMDropdown,
  EMDropdownItem,
  EMDropdownMenu,
  EMDropdownToggle,
  EMImg,
  EMIcon,
} from "../../../../components/index";

function HeaderDropdown() {
  const dispatch = useDispatch();

  const userLogout = useSelector((state) => state.userLogout);
  const { success } = userLogout;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAILS_UPDATE, payload: undefined });
      dispatch(push("/"));
    }
  }, [success]);

  return (
    <EMDropdown inNav className="c-header-nav-items mx-4" direction="down">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
       
        <div className="c-avatar">
          <EMImg
            src={"avatars/s.png"}
            className="c-avatar-img"
            alt="em@gmail.com"
          />
        </div>
         <a className="btn bg-white dropdown-toggle shadow-none" role="button">
           Simay B.
         </a>
      </EMDropdownToggle>
      <EMDropdownMenu className="pt-0 px-3" placement="bottom-end">
        <button
          type="button"
          className="btn btn-outline-secondary btn-block font-weight-bold text-dark mt-3"
        >
          Profili Görüntüle
        </button>
        <EMDropdownItem divider />
        <h6 className="font-weight-bold mt-2 text-dark">Hesap </h6>
        <EMDropdownItem>
          <EMIcon name="cil-settings" className="mfe-2 " />
          Ayarlar
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-warning" className="mfe-2 " />
          Yardım
        </EMDropdownItem>
        <EMDropdownItem divider />
        <EMDropdownItem onClick={(e) => handleLogout(e)}>
          <EMIcon name="cil-lock-locked" className="mfe-2" />
          Çıkış Yap
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
}

export default HeaderDropdown;
