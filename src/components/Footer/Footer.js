import React from 'react'
import PropTypes from 'prop-types'
import FooterButtonContainer from '@/containers/FooterButtonContainer'
import './Footer.scss'

export const Footer = ({ pathname, footerBtns }) => (
  <div>
    {pathname.indexOf('/new') !== 0 && <footer className='footer'>
      {footerBtns.map((aBtn, index) =>
        <FooterButtonContainer
          key={index}
          {...aBtn}
        />
      )}
    </footer>}
  </div>
)

Footer.propTypes = {
  footerBtns: PropTypes.arrayOf(PropTypes.shape({
    homePage: PropTypes.bool,
    iconClass: PropTypes.string.isRequired,
    title: PropTypes.string,
    linkUrl: PropTypes.string.isRequired,
    btnType: PropTypes.string
  }).isRequired).isRequired
}

export default Footer
