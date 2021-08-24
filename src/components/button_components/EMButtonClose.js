import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const EMButtonClose = (props) => {
  const { children, className, buttonClass, innerRef, ...attributes } = props;

  const classes = classNames(buttonClass, className);

  return (
    <button
      className={classes}
      aria-label="Close"
      {...attributes}
      ref={innerRef}
    >
      {children || String.fromCharCode(215)}
    </button>
  );
};

EMButtonClose.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  buttonClass: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMButtonClose.defaultProps = {
  buttonClass: "close",
};

export default EMButtonClose;
