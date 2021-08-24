import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

//component - CoreUI / EMButtonToolbar

const EMButtonToolbar = (props) => {
  const {
    className,
    //
    innerRef,
    justify,
    ...attributes
  } = props;

  //render

  const classes = classNames(className, "btn-toolbar", "d-inner", {
    [`justify-content-${justify}`]: justify,
  });

  return (
    <div
      className={classes}
      role="toolbar"
      aria-label="toolbar"
      {...attributes}
      ref={innerRef}
    />
  );
};

EMButtonToolbar.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  role: PropTypes.string,
  justify: PropTypes.oneOf(["", "start", "end", "between", "center"]),
};

export default EMButtonToolbar;
