import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMFooter
const EMFooter = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    fixed,
    ...attributes
  } = props

  //render
  const classes = classNames(
    'c-footer',
    fixed ? 'c-footer-fixed' : null,
    className
  )

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )
}

EMFooter.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  fixed: PropTypes.bool
};

EMFooter.defaultProps = {
  tag: 'footer',
  fixed: false
};

export default EMFooter
