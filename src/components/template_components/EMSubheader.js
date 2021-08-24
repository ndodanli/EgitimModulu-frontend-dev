import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { tagPropType } from '../utils/helper.js'

//component - CoreUI / EMSubheader
const EMSubheader = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    ...attributes
  } = props

  //render
  const classes = classNames(
    'c-subheader',
    className
  )

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )
}

EMSubheader.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

EMSubheader.defaultProps = {
  tag: 'div'
};

export default EMSubheader
