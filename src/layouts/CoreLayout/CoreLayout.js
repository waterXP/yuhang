import React from 'react'
import PropTypes from 'prop-types'
import FooterContainer from '@/containers/FooterContainer'
import './CoreLayout.scss'
import '@/styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <div className='core-layout__viewport'>
      {children}
    </div>
    <FooterContainer />
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
