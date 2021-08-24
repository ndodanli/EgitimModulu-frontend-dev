import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper";

//component - CoreUI / EMModalBody

const EMModalBody = (props) => {
  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames(className, "modal-body");

  return (
    <Tag
      style={{ padding: 0 }} //degistirilecek
      className={classes}
      {...attributes}
      ref={innerRef}
    />
  );
};

EMModalBody.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMModalBody.defaultProps = {
  tag: "div",
};

export default EMModalBody;
