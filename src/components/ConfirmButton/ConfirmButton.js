import React from 'react'
import './ConfirmButton.scss'

export const ConfirmButton = ({ type, handleClick, icon, text }) => {
  return (
    <button
      className='wm-confirm-button btn'
      type={type || 'button'}
      onClick={handleClick.bind(this)}>
      {icon && <i className={`fa ${icon}`}></i>}
      {text}
    </button>
  )
}

export default ConfirmButton
