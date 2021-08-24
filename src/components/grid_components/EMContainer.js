import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {tagPropType} from '../utils/helper.js';

//component - CoreUI / EMContainer

const EMContainer = props=>{

  const {
    tag: Tag,
    className,
    //
    innerRef,
    fluid,
    ...attributes
  } = props;

  //render

  const classes = classNames(
    className,
    fluid ? 'container-fluid' : 'container'
  );

  return (
    <Tag {...attributes} className={classes} ref={innerRef} />
  );

}

EMContainer.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  fluid: PropTypes.bool
};

EMContainer.defaultProps = {
  tag: 'div',
};

export default EMContainer;
