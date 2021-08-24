import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from '../utils/helper.js';

//component - CoreUI / EMCardSubtitle

const EMCardSubtitle = props=>{

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
    'card-subtitle'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

EMCardSubtitle.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMCardSubtitle.defaultProps = {
  tag: 'h6'
};

export default EMCardSubtitle;
