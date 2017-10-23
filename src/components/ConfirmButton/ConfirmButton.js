import React from 'react'
import PropTypes from 'prop-types'
import './ConfirmButton.scss'

export const ConfirmButton = ({ type, handleClick, icon, text, img }) => {
  return (
    <button
      className='wm-confirm-button btn'
      type={type || 'button'}
      onClick={() => handleClick()}>
      {img && <img className='img-icon' src={img} />}
      {icon && <i className={`fa ${icon}`} />}
      <span>{text}</span>
    </button>
  )
}

ConfirmButton.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string
}

export default ConfirmButton
