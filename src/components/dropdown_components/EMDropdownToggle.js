import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper.js";
import EMButton from "../button_components/EMButton";
import EMLink from "../link_components/EMLink";
import { Context } from "../dropdown_components/EMDropdown";

//component - CoreUI / EMDropdownToggle

const EMDropdownToggle = (props) => {
  const {
    className,
    //
    innerRef,
    onClick,
    caret,
    split,
    tag,
    ...attributes
  } = props;

  const {
    reference,
    setReference,
    isOpen,
    setIsOpen,
    inNav,
    setSplit,
  } = useContext(Context);

  innerRef && innerRef(reference);

  useEffect(() => {
    setSplit(split);
  });

  const click = (e) => {
    if (props.disabled) {
      return;
    }
    onClick && onClick(e);
    setIsOpen(!isOpen);
  };

  const Tag = tag || (inNav ? EMLink : EMButton);

  const classes = classNames(className, {
    "dropdown-toggle": caret && !split,
    "nav-link": inNav,
  });

  const togglerAttrs = {
    onClick: click,
    "aria-expanded": isOpen ? "true" : "false",
    "aria-haspopup": "true",
    "aria-label": "Dropdown toggle",
    [`${tag && typeof tag === "string" ? "ref" : "innerRef"}`]: setReference,
    role: Tag === EMButton ? null : "button",
  };

  if (split) {
    return (
      <React.Fragment>
        <EMButton {...attributes}>{props.children}</EMButton>
        <EMButton
          className="dropdown-toggle dropdown-toggle-split"
          {...togglerAttrs}
          {...attributes}
        >
          {""}
        </EMButton>
      </React.Fragment>
    );
  } else {
    return <Tag className={classes} {...togglerAttrs} {...attributes} />;
  }
};

EMDropdownToggle.propTypes = {
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  caret: PropTypes.bool,
  onClick: PropTypes.func,
  split: PropTypes.bool,
  disabled: PropTypes.bool,
};

EMDropdownToggle.defaultProps = {
  caret: true,
};

export default EMDropdownToggle;
