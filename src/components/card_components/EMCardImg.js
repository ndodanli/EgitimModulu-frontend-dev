import React from 'react'
import PropTypes from 'prop-types'
import EMImg from './EMImg'

//component - CoreUI / EMCardImg
const EMCardImg = props => {
  const { variant, ...rest } = props
  const classSuffix = variant !== 'full' ? `-${variant}` : ''
  return (
    <EMImg {...rest} className={[`card-img${classSuffix}`, rest.className]}/>
  )
}

EMCardImg.propTypes = {
  variant: PropTypes.oneOf(['', 'top', 'bottom', 'full'])
}

EMCardImg.defaultProps = {
  variant: 'full'
}

export default EMCardImg
