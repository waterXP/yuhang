import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FooterButtonContainer from '@/containers/FooterButtonContainer'
import './Footer.scss'

class Footer extends Component {
  render () {
    let footerBtns = this.props.footerBtns
    let pathname = this.props.pathname
    return (
      <div>
        {(pathname.indexOf('/new') === -1 &&
          pathname.indexOf('detail') === -1) &&
          <footer className='footer'>
            {footerBtns.map((aBtn, index) =>
              <FooterButtonContainer
                key={index}
                {...aBtn}
              />
            )}
          </footer>
        }
      </div>
    )
  }
}

Footer.propTypes = {
  footerBtns: PropTypes.arrayOf(PropTypes.shape({
    homePage: PropTypes.bool,
    iconClass: PropTypes.string.isRequired,
    title: PropTypes.string,
    linkUrl: PropTypes.string.isRequired,
    btnType: PropTypes.string
  }).isRequired).isRequired,
  pathname: PropTypes.string
}

export default Footer
