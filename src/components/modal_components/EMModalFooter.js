import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper";

//component - CoreUI / EMModalFooter

const EMModalFooter = (props) => {
  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames(className, "modal-footer");

  return <Tag className={classes} {...attributes} ref={innerRef} />;
};

EMModalFooter.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMModalFooter.defaultProps = {
  tag: "footer",
};

export default EMModalFooter;
