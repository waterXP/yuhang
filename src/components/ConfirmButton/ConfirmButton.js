import React from 'react'
import './ConfirmButton.scss'

export const ConfirmButton = (props) => {
  return (
    <button className='wm-confirm-button btn' onClick={props.handleClick.bind(this)}>{props.text}</button>
  )
}

export default ConfirmButton
