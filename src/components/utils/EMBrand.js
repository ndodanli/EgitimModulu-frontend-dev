import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { tagPropType } from "./helper.js";
import EMLink from "../link_components/EMLink";

//component - CoreUI / EMBrand
const EMBrand = (props) => {
  const {
    tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames(className);

  const Tag = attributes.to || attributes.href ? EMLink : tag;
  const ref = { [`${typeof Tag === "string" ? "ref" : "innerRef"}`]: innerRef };
  return <Tag className={classes} {...attributes} {...ref} />;
};

EMBrand.propTypes = {
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMBrand.defaultProps = {
  tag: "div",
};

export default EMBrand;
