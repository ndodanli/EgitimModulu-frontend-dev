import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { tagPropType } from '../utils/helper.js'

//component - CoreUI / EMFormText
const EMFormText = props => {

  const {
    tag: Tag,
    className,
    innerRef,
    //
    color,
    ...attributes
  } = props

  //render

  const classes = classNames(
    'form-text', color && `text-${color}`, className
  )

  return (
    <Tag className={classes} {...attributes} ref={innerRef}/>
  )

}

EMFormText.propTypes = {
  tag: tagPropType,
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  color: PropTypes.string
};

EMFormText.defaultProps = {
  tag: 'small',
  color: 'muted'
};

export default EMFormText
