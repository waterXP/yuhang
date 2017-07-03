import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'
import './FooterButton.scss'

export const FooterButton = ({ homePage, linkUrl, iconClass, btnType, title, pathname }) => {
  if (homePage) {
    return (
      <IndexLink to={linkUrl} activeClassName='active' className={`footer-button ${btnType || ''}`} disabled={pathname === linkUrl}>
        <i className={`fa ${iconClass || ''}`} />
        {btnType !== 'imgOnly' && <p>{title}</p>}
      </IndexLink>
    )
  }
  return (
    <Link to={linkUrl} activeClassName='active' className={`footer-button ${btnType || ''}`} disabled={pathname.indexOf(linkUrl) === 0}>
      <i className={`fa ${iconClass || ''}`} />
      {btnType !== 'imgOnly' && <p>{title}</p>}
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
