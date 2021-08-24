import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMSidebarNavTitle

const EMSidebarNavTitle = props => {

  const {
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render
  const classes = classNames(
    'c-sidebar-nav-title',
    className
  )

  return (
    <li className={classes} {...attributes} ref={innerRef}/>
  )
}

EMSidebarNavTitle.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};


export default EMSidebarNavTitle
