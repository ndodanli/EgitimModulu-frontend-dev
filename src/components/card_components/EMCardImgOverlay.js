import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from '../utils/helper.js';

//component - CoreUI / EMCardImgOverlay

const EMCardImgOverlay = props=>{

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames(
    className,
    'card-img-overlay'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

EMCardImgOverlay.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMCardImgOverlay.defaultProps = {
  tag: 'div'
};

export default EMCardImgOverlay;
