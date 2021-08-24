import React from "react";
import {
  EMBadge,
  EMDropdown,
  EMDropdownItem,
  EMDropdownMenu,
  EMDropdownToggle,
  EMImg,
  EMIcon,
} from "../../../../components/index";

const HeaderDropdownMssg = () => {
  const itemsCount = 4;
  return (
    <EMDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-envelope-open" />
        <EMBadge shape="pill" color="info">
          {itemsCount}
        </EMBadge>
      </EMDropdownToggle>
      <EMDropdownMenu className="pt-0" placement="bottom-end">
        <EMDropdownItem header tag="div" color="light">
          <strong>You have {itemsCount} messages</strong>
        </EMDropdownItem>
        <EMDropdownItem href="#">
          <div className="message">
            <div className="pt-3 mr-3 float-left">
              <div className="c-avatar">
                <EMImg
                  src={"avatars/7.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">John Doe</small>
              <small className="text-muted float-right mt-1">Just now</small>
            </div>
            <div className="text-truncate font-weight-bold">
              <span className="fa fa-exclamation text-danger"></span> Important
              message
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
                <EMImg
                  src={"avatars/6.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Jane Dovve</small>
              <small className="text-muted float-right mt-1">
                5 minutes ago
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
                <EMImg
                  src={"avatars/5.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Janet Doe</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
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
                <EMImg
                  src={"avatars/4.jpg"}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
                <span className="c-avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">4:03 AM</small>
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
          <strong>View all messages</strong>
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
};

export default HeaderDropdownMssg;
