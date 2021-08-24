import React from "react";
import {
  EMDropdown,
  EMDropdownItem,
  EMDropdownMenu,
  EMDropdownToggle,
  EMBadge,
  EMIcon,
  EMImg,
} from "../../../../components/index";

const HeaderDropdownMssg = () => {
  const itemsCount = 4;
  return (
    <EMDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-envelope-open" size="xl" />
        <EMBadge shape="pill" color="success">
          {itemsCount}
        </EMBadge>
      </EMDropdownToggle>
      <EMDropdownMenu className="pt-0" placement="bottom-end">
        <EMDropdownItem header tag="div" color="light">
          <strong> {itemsCount} adet mesajın var.</strong>
        </EMDropdownItem>
        <EMDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <EMImg src={"avatars/7.jpg"} className="c-avatar-img" />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">John Doe</small>
              <small className="text-muted float-right mt-1">Şimdi</small>
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt...
            </div>
          </div>
        </EMDropdownItem>

        <EMDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <EMImg src={"avatars/6.jpg"} className="c-avatar-img" />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Jane Dovve</small>
              <small className="text-muted float-right mt-1">
                5 dakika önce
              </small>
            </div>
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt...
            </div>
          </div>
        </EMDropdownItem>

        <EMDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <EMImg src={"avatars/5.jpg"} className="c-avatar-img" />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-right mt-1">18.49</small>
            </div>
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt...
            </div>
          </div>
        </EMDropdownItem>

        <EMDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <EMImg src={"avatars/4.jpg"} className="c-avatar-img" />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">21.02</small>
            </div>
            <div className="text-truncate font-weight-bold">
              Lorem ipsum dolor sit amet
            </div>
            <div className="small text-muted text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt...
            </div>
          </div>
        </EMDropdownItem>
        <EMDropdownItem href="#" className="text-center border-top">
          <strong>Tüm mesajları gör</strong>
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
};

export default HeaderDropdownMssg;
