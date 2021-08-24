import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper.js";
import { Context } from "../dropdown_components/EMDropdown";
import EMLink from "../link_components/EMLink";

//component - CoreUI / EMDropdownItem
const EMDropdownItem = (props) => {
  let {
    tag,
    className,
    //
    innerRef,
    onClick,
    color,
    divider,
    header,
    active,
    disabled,
    ...rest
  } = props;

  const { setIsOpen } = useContext(Context);

  const isItem = !(header || divider);

  const click = (e) => {
    if (disabled) {
      return;
    }
    onClick && onClick(e);
    isItem && setIsOpen(false);
  };

  //render
  const tabIndex = isItem && !disabled ? null : -1;
  const role = tabIndex === null ? "menuitem" : undefined;
  const Tag = tag || (!isItem ? "div" : EMLink);
  const ref = { [`${typeof Tag === "string" ? "ref" : "innerRef"}`]: innerRef };

  const classes = classNames(
    className,
    "dropdown-" + (header ? "header" : divider ? "divider" : "item"),
    { active },
    color && "bg-" + color,
    disabled && Tag !== EMLink && "disabled"
  );

  return (
    <Tag
      className={classes}
      tabIndex={tabIndex}
      role={role}
      disabled={disabled}
      {...rest}
      onClick={click}
      {...ref}
    />
  );
};

EMDropdownItem.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  color: PropTypes.string,
  divider: PropTypes.bool,
  header: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default EMDropdownItem;
