import React from "react";
import {
  EMBadge,
  EMDropdown,
  EMDropdownItem,
  EMDropdownMenu,
  EMDropdownToggle,
  EMProgress,
  EMIcon,
} from "../../../../components/index";

const HeaderDropdownNotif = () => {
  const itemsCount = 5;
  return (
    <EMDropdown inNav className="c-header-nav-item mx-2">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-bell" />
        <EMBadge shape="pill" color="danger">
          {itemsCount}
        </EMBadge>
      </EMDropdownToggle>
      <EMDropdownMenu placement="bottom-end" className="pt-0">
        <EMDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} notifications</strong>
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-user-follow" className="mr-2 text-success" /> New
          user registered
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User
          deleted
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales
          report is ready
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-basket" className="mr-2 text-primary" /> New client
        </EMDropdownItem>
        <EMDropdownItem>
          <EMIcon name="cil-speedometer" className="mr-2 text-warning" /> Server
          overloaded
        </EMDropdownItem>
        <EMDropdownItem header tag="div" color="light">
          <strong>Server</strong>
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>CPU Usage</b>
            </small>
          </div>
          <EMProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>Memory Usage</b>
            </small>
          </div>
          <EMProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small>
              <b>SSD 1 Usage</b>
            </small>
          </div>
          <EMProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
};

export default HeaderDropdownNotif;
