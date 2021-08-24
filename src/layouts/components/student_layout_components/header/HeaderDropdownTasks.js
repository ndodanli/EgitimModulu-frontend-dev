import React from "react";
import {
  EMDropdown,
  EMDropdownToggle,
  EMBadge,
  EMIcon,
} from "../../../../components/index";

const HeaderDropdownTasks = () => {
  const itemsCount = 1;
  return (
    <EMDropdown inNav className="c-header-nav-item mx-2">
      <EMDropdownToggle className="c-header-nav-link" caret={false}>
        <EMIcon name="cil-alarm" size="xl" />
        <EMBadge shape="pill" color="warning">
          {itemsCount}
        </EMBadge>
      </EMDropdownToggle>
    </EMDropdown>
  );
};

export default HeaderDropdownTasks;
