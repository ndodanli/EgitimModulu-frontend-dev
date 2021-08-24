import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Context } from "./EMSidebar";

//component - CoreUI / EMSidebarMinimizer

const EMSidebarMinimizer = (props) => {
  const {
    className,
    //
    innerRef,
    ...attributes
  } = props;

  const { toggleMinimize } = useContext(Context);
  //render

  const classes = classNames("c-sidebar-minimizer", className);
  return (
    <button
      className={classes}
      type="button"
      {...attributes}
      onClick={toggleMinimize}
      ref={innerRef}
    />
  );
};

EMSidebarMinimizer.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default EMSidebarMinimizer;
