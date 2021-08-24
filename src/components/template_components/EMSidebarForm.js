import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMSidebarForm

const EMSidebarForm = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render

  const classes = classNames('c-sidebar-form', className)

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )
}

EMSidebarForm.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

EMSidebarForm.defaultProps = {
  tag: 'div'
};

export default EMSidebarForm
