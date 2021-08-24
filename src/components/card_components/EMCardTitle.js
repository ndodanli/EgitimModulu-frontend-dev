import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from '../utils/helper.js';

//component - CoreUI / EMCardTitle

const EMCardTitle = props=>{

  const {
    tag: Tag,
    className,
    innerRef,
    ...attributes
  } = props;

  //render

  const classes = classNames(
    className,
    'card-title'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

EMCardTitle.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMCardTitle.defaultProps = {
  tag: 'h4'
};

export default EMCardTitle;
