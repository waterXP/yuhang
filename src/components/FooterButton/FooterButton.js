import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './FooterButton.scss'

export const FooterButton =
({ homePage, linkUrl, iconClass, btnType, title, pathname }) => {
  return (
    <Link
      to={linkUrl}
      activeClassName='active'
      className={`footer-button ${btnType || ''}`}
      disabled={pathname.indexOf(linkUrl) === 0}
    >
      <i className={`fa ${iconClass || ''}`} />
      <p>{title}</p>
    </Link>
  )
}

FooterButton.propTypes = {
  homePage: PropTypes.any,
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  btnType: PropTypes.string,
  pathname: PropTypes.string
}

export default FooterButton
