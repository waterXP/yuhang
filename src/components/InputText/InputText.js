import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './InputText.scss'

export const InputText = (props) => {
  return (
    <div className='wm-input-text form-group'>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <Field
        id={props.id}
        name={props.name}
        component='input'
        type='text'
        placeholder={props.placeholder} />
    </div>
  )
}

InputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string
}

export default InputText