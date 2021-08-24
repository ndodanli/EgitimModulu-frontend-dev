import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import EMProgressBar from './EMProgressBar'

export const Context = React.createContext({})
//component - CoreUI / EMProgress

const EMProgress = props => {

  const {
    children,
    className,
    //
    innerRef,
    size,
    color,
    striped,
    animated,
    precision,
    showPercentage,
    showValue,
    max,
    value,
    ...attributes
  } = props

  const inheritedProps = {
    color,
    striped,
    animated,
    precision,
    showPercentage,
    showValue,
    max,
    value
  }

  const progressClasses = classNames(
    'progress', 
    size && 'progress-' + size,
    className
  )

  // render
  return (
    <div 
      className={progressClasses} 
      {...attributes} 
      ref={innerRef}
    >
      <Context.Provider value={{ inheritedProps }}>
        { children || <EMProgressBar/>}
      </Context.Provider>
    </div>
  )

}

EMProgress.propTypes = {
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
  //
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  size: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  color: PropTypes.string,
  precision: PropTypes.number,
  showPercentage: PropTypes.bool,
  showValue: PropTypes.bool
};

EMProgress.defaultProps = {
  value: 0,
  max: 100,
  precision: 0
};

export default EMProgress
