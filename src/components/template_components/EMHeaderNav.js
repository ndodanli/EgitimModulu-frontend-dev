import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

//component - CoreUI / EMHeaderNav

const EMHeaderNav = props => {

  const {
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render

  const classes = classNames(
    className,
    'c-header-nav'
  )

  return (
    <ul className={classes} {...attributes} ref={innerRef} />
  )

}

EMHeaderNav.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};


export default EMHeaderNav
