import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "../utils/helper.js";
import EMLink from "../link_components/EMLink";

//component - CoreUI / EMBadge

const EMBadge = (props) => {
  let {
    tag,
    className,
    //
    innerRef,
    color,
    shape,
    ...attributes
  } = props;

  // render

  const classes = classNames(className, "badge", {
    [`badge-${color}`]: color,
    [`badge-${shape}`]: shape,
  });

  const Tag = attributes.to || attributes.href ? EMLink : tag;
  const ref = { [`${typeof Tag === "string" ? "ref" : "innerRef"}`]: innerRef };

  return <Tag className={classes} {...attributes} {...ref} />;
};

EMBadge.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  color: PropTypes.string,
  shape: PropTypes.oneOf(["", "pill"]),
};

EMBadge.defaultProps = {
  tag: "span",
};

export default EMBadge;
