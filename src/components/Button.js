import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({ url, onClick, text, style }) => (
  <a
    className={style || 'btn btn-xs btn-default'}
    href={url}
    onClick={onClick}
  >
    {text}
  </a>
)

Button.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  style: PropTypes.string
}

export default Button
