/* eslint react/prop-types: 0 */
import React from 'react'
import EMLink from '../link_components/EMLink'

const EMCardLink = props => {
  return (
    <EMLink {...props} className={['card-link', props.className]}/>
  )
}

export default EMCardLink
