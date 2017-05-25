import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'
import './FooterButton.scss'

export const FooterButton = (props) => {
  if (props.homePage) {
    return (
      <IndexLink to={props.linkUrl} activeClassName='active' className={`footer-button ${props.btnType || ''}`}>
        <i className={`fa ${props.iconClass || ''}`}></i>
        {props.btnType!=='imgOnly' && <p>{props.title}</p>}
      </IndexLink>
    )
  }
  return (
    <Link to={props.linkUrl} activeClassName='active' className={`footer-button ${props.btnType || ''}`}>
      <i className={`fa ${props.iconClass || ''}`}></i>
      {props.btnType!=='imgOnly' && <p>{props.title}</p>}
    </Link>
  )
}

FooterButton.propTypes = {
  homePage: PropTypes.any,
  iconClass: PropTypes.string.isRequired,
  title: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  btnType: PropTypes.string
}

export default FooterButton
