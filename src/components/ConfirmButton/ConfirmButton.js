import React from 'react'
import './ConfirmButton.scss'

export const ConfirmButton = (props) => {
  return (
    <button className='wm-confirm-button btn'>{props.text}</button>
  )
}

export default ConfirmButton
