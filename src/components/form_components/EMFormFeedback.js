import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

//component - CoreUI / EMFormFeedback

const EMFormFeedback = (props) => {
  const {
    className,
    //
    innerRef,
    valid,
    tooltip,
    ...attributes
  } = props;

  //render
  const validMode = tooltip ? "tooltip" : "feedback";
  const classes = classNames(
    valid ? `valid-${validMode}` : `invalid-${validMode}`,
    className
  );

  return <div className={classes} {...attributes} ref={innerRef} />;
};

EMFormFeedback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  valid: PropTypes.bool,
  tooltip: PropTypes.bool,
};

export const EMValidFeedback = (props) => <EMFormFeedback {...props} valid />;
export const EMInvalidFeedback = (props) => (
  <EMFormFeedback {...props} valid={false} />
);
