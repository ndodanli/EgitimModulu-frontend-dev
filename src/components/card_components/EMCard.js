import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { tagPropType } from '../utils/helper.js'

//component - CoreUI / EMCard

const EMCard = props => {

  const {
    tag: Tag,
    className,
    //
    innerRef,
    color,
    textColor,
    borderColor,
    align,
    accentColor,
    ...attributes
  } = props

  //render

  const classes = classNames(
    className,
    'card',
    align ? `text-${align}` : false,
    textColor ? `text-${textColor}` : false,
    color ? `bg-${color}` : false,
    borderColor ? `border-${borderColor}` : false,
    accentColor ? `card-accent-${accentColor}` : false,
  )


  return (
    <Tag 
      className={classes} 
      {...attributes} 
      ref={innerRef}
    />
  )
}

export const sharedPropTypes = {
  align: PropTypes.oneOf(['', 'left', 'center', 'right']),
  color: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string
}

EMCard.propTypes = {
  tag: tagPropType,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  accentColor: PropTypes.string,
  ...sharedPropTypes
}

EMCard.defaultProps = {
  tag: 'div'
}

export default EMCard
