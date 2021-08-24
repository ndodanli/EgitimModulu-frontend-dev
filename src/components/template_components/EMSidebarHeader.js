import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMSidebarHeader

const EMSidebarHeader = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render

  const classes = classNames('c-sidebar-header', className)

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )
}

EMSidebarHeader.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

EMSidebarHeader.defaultProps = {
  tag: 'div'
};

export default EMSidebarHeader
