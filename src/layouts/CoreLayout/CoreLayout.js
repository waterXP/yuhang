import React from 'react'
import PropTypes from 'prop-types'
import FooterContainer from '@/containers/FooterContainer'
import './CoreLayout.scss'
import '@/styles/core.scss'

export const CoreLayout = (props) => {
  const { children, location } = props
  let noFooter = false
  if (location.pathname.indexOf('/new') === 0) {
    noFooter = true
  }
  return (
    <div className='container text-center'>
      <div className={`core-layout__viewport${noFooter ? ' no-footer' : ''}`}>
        { children }
      </div>
      <FooterContainer />
    </div>
  )
}

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
