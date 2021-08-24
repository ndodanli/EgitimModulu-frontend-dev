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
    //eğer userLogout reducer'ındaki success null, undefined değil ise "/"e pushla ve userInfo'yu temizle(ek kontrol)
    if (success) {
      dispatch({ type: USER_DETAILS_UPDATE, payload: undefined });
      dispatch(push("/"));
    }
  }, [success]);

  return (
    <EMDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <EMImg
            src={"avatars/avatar.png"}
            className="c-avatar-img"
            alt="em@gmail.com"
          />
        </div>
      </EMDropdownToggle>
      <EMDropdownMenu className="pt-0" placement="bottom-end">
        {/* <EMDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem> */}
        <EMDropdownItem header tag="div" color="light" className="text-center">
          <strong>Ayarlar</strong>
        </EMDropdownItem>
        {/* <EMDropdownItem>
          <EMIcon name="cil-user" className="mfe-2" />
          Profile
        </EMDropdownItem> */}
        {/* <EMDropdownItem>
          <EMIcon name="cil-settings" className="mfe-2" />
          Settings
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">
            42
          </CBadge>
        </EMDropdownItem> */}
        {/* <EMDropdownItem divider /> */}
        <EMDropdownItem to="school-profile">
          <EMIcon name="cil-account-logout" className="mfe-2" />
          Profil
        </EMDropdownItem>
        <EMDropdownItem onClick={(e) => handleLogout(e)}>
          <EMIcon name="cil-account-logout" className="mfe-2" />
          Çıkış yap
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
}

export default HeaderDropdown;
