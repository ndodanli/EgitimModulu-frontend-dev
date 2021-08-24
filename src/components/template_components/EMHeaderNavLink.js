import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EMLink from "../link_components/EMLink";

//component - CoreUI / EMHeaderNavLink

const EMHeaderNavLink = (props) => {
  const {
    className,
    //
    innerRef,
    ...rest
  } = props;

  //render

  const classes = classNames(className, "c-header-nav-link");

  return <EMLink className={classes} {...rest} innerRef={innerRef} />;
};

EMHeaderNavLink.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default EMHeaderNavLink;
