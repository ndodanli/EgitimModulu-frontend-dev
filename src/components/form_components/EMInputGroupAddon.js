import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

//component - CoreUI / EMInputGroupAddon
const EMInputGroupAddon = (props) => {
  const {
    children,
    className,
    //
    innerRef,
    prepend,
    ...attributes
  } = props;

  //render
  const classes = classNames(
    "input-group-" + (prepend ? "prepend" : "append"),
    className
  );

  return (
    <div className={classes} {...attributes} ref={innerRef}>
      {children}
    </div>
  );
};

EMInputGroupAddon.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  prepend: PropTypes.bool,
};

export const EMInputGroupAppend = (props) => (
  <EMInputGroupAddon {...props} prepend={false} />
);
export const EMInputGroupPrepend = (props) => (
  <EMInputGroupAddon {...props} prepend />
);
