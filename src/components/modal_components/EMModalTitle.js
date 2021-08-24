import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper";

//component - CoreUI / EMModalTitle
const EMModalTitle = (props) => {
  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames("modal-title", className);

  return <Tag className={classes} {...attributes} ref={innerRef} />;
};

EMModalTitle.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMModalTitle.defaultProps = {
  tag: "h5",
};

export default EMModalTitle;
