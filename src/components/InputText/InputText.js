import React from 'react'
import PropTypes from 'prop-types'
import './InputText.scss'

export const InputText = (props) => {
  return (
    <div className='wm-input-text form-group'>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        id={props.id}
        type='text'
        className='form-control'
        defaultValue={props.value}
        placeholder={props.placeholder}
        ref={props.s} />
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
}

export default InputText