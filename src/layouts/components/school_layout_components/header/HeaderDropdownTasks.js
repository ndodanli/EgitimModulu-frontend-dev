import React from "react";
import {
  EMBadge,
  EMDropdown,
  EMDropdownItem,
  EMDropdownMenu,
  EMDropdownToggle,
  EMProgress,
  EMIcon,
} from "../../../../components";

const HeaderDropdownTasks = () => {
  const itemsCount = 5;
  return (
    <EMDropdown inNav className="c-header-nav-item mx-2">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-list" />
        <EMBadge shape="pill" color="warning">
          {itemsCount}
        </EMBadge>
      </EMDropdownToggle>
      <EMDropdownMenu placement="bottom-end" className="pt-0">
        <EMDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} pending tasks</strong>
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="small mb-1">
            Upgrade NPM &amp; Bower{" "}
            <span className="float-right">
              <strong>0%</strong>
            </span>
          </div>
          <EMProgress size="xs" color="info" value={0} />
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="small mb-1">
            ReactJS Version{" "}
            <span className="float-right">
              <strong>25%</strong>
            </span>
          </div>
          <EMProgress size="xs" color="danger" value={25} />
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="small mb-1">
            VueJS Version{" "}
            <span className="float-right">
              <strong>50%</strong>
            </span>
          </div>
          <EMProgress size="xs" color="warning" value={50} />
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="small mb-1">
            Add new layouts{" "}
            <span className="float-right">
              <strong>75%</strong>
            </span>
          </div>
          <EMProgress size="xs" color="info" value={75} />
        </EMDropdownItem>
        <EMDropdownItem className="d-block">
          <div className="small mb-1">
            Angular 2 Cli Version{" "}
            <span className="float-right">
              <strong>100%</strong>
            </span>
          </div>
          <EMProgress size="xs" color="success" value={100} />
        </EMDropdownItem>
        <EMDropdownItem className="text-center border-top">
          <strong>View all tasks</strong>
        </EMDropdownItem>
      </EMDropdownMenu>
    </EMDropdown>
  );
};

export default HeaderDropdownTasks;
