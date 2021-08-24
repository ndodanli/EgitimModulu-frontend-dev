import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//component - CoreUI / EMHeader

const EMHeader = props=>{

  const {
    tag: Tag,
    className,
    //
    innerRef,
    fixed,
    colorScheme,
    withSubheader,
    ...attributes
  } = props;

  // render

  const classes = classNames(className,
  'c-header',
  colorScheme ? 'c-header-' + colorScheme : null,
  fixed ? 'c-header-fixed' : null,
  withSubheader ? 'c-header-with-subheader' : null);

  return (
    <Tag className={classes} {...attributes} ref={innerRef} />
  );

}

EMHeader.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  children: PropTypes.node,
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  fixed: PropTypes.bool,
  withSubheader: PropTypes.bool,
  colorScheme: PropTypes.string,
};

EMHeader.defaultProps = {
  tag: 'header',
  fixed: true,
  colorScheme: 'light'
};

export default EMHeader;
