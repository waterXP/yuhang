import React from 'react'
import PropTypes from 'prop-types'
import { IndexLink, Link } from 'react-router'
import './FooterButton.scss'

export const FooterButton = (props) => {
  if (props.homePage) {
    return (
      <IndexLink to={props.linkUrl} activeClassName='active' className='footer-button'>
        {props.imgUrl && <img src={props.imgUrl} />}
        {props.title}
      </IndexLink>
    )
  }
  return (
    <Link to={props.linkUrl} activeClassName='active' className='footer-button'>
      {props.imgUrl && <img src={props.imgUrl} />}
      {props.title}
    </Link>
  )
}

FooterButton.propTypes = {
  homePage: PropTypes.any,
  imgUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
}

export default FooterButton
