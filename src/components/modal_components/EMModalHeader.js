import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper";
import { Context } from "./EMModal";
import { EMButtonClose } from "../index";
//component - CoreUI / EMModalHeader

const EMModalHeader = (props) => {
  const {
    tag: Tag,
    className,
    //
    innerRef,
    closeButton,
    ...attributes
  } = props;

  const { close } = useContext(Context);

  //render

  const classes = classNames(className, "modal-header");

  return (
    <Tag className={classes} {...attributes} ref={innerRef}>
      {props.children}
      {closeButton && <EMButtonClose onClick={close} />}
    </Tag>
  );
};

EMModalHeader.propTypes = {
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  closeButton: PropTypes.bool,
};

EMModalHeader.defaultProps = {
  tag: "header",
};

export default EMModalHeader;
