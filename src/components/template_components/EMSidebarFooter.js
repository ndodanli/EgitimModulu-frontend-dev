import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMSidebarFooter

const EMSidebarFooter = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props

  // render
  const classes = classNames('c-sidebar-footer', className)

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )
}

EMSidebarFooter.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

EMSidebarFooter.defaultProps = {
  tag: 'div'
};

export default EMSidebarFooter
