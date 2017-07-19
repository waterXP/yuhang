import React from 'react'
import PropTypes from 'prop-types'
import './ConfirmButton.scss'

export const ConfirmButton = ({ type, handleClick, icon, text }) => {
  return (
    <button
      className='wm-confirm-button btn'
      type={type || 'button'}
      onClick={() => handleClick()}>
      {icon && <i className={`fa ${icon}`} />}
      {text}
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
