import React from 'react'
import PropTypes from 'prop-types'
import FooterContainer from '@/containers/FooterContainer'
import './CoreLayout.scss'
import '@/styles/core.scss'

export const CoreLayout = (props) => {
  const { children, location } = props
  let footerClass = ''
  if (location.pathname.indexOf('/new') === 0) {
    footerClass = ' no-footer'
  } else if (location.pathname.indexOf('/home/approve_detail') === 0 ||
    location.pathname.indexOf('/home/detail') === 0 ||
    location.pathname.indexOf('/approval/detail') === 0) {
    footerClass = ' sm-footer'
  }
  return (
    <div className='container text-center'>
      <div className={`core-layout__viewport${footerClass}`}>
        { children }
      </div>
      <FooterContainer />
    </div>
  )
}

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired,
  location: PropTypes.object.isRequired
}

export default CoreLayout
