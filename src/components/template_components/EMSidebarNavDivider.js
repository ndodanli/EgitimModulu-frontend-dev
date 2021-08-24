import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMSidebarNavDivider

const EMSidebarNavDivider = props => {

  const {
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render

  const classes = classNames(
    'c-sidebar-nav-divider',
    className
  )

  return (
    <li className={classes} {...attributes} ref={innerRef} />
  )

}

EMSidebarNavDivider.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};


export default EMSidebarNavDivider
