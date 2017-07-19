import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './InputText.scss'

export const InputText = ({ label, id, name, placeholder, maxLength }) => {
  return (
    <div className='wm-input-text form-group'>
      {label && <label htmlFor={id}>{label}</label>}
      <Field
        id={id}
        name={name}
        component='input'
        type='text'
        placeholder={placeholder}
        maxLength={maxLength} />
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.any
}

export default InputText
