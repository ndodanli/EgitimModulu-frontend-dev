import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from '../utils/helper.js';

//component - CoreUI / EMCardText

const EMCardText = props=>{

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
    'card-text'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

EMCardText.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

EMCardText.defaultProps = {
  tag: 'p'
};

export default EMCardText;
