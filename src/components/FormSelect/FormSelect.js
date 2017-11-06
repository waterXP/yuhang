import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormSelect.scss'

class FormSelect extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    iconRight: PropTypes.string,
    imgRight: PropTypes.string,
    clickHandler: PropTypes.func
  }

  render () {
    const { text, name, value, iconRight, imgRight, clickHandler } = this.props
    return (
      <div className='wm-form-select'>
        <label>{text}</label>
        <Field name={name} component='button' type='button' onClick={clickHandler}>
          {value}
          {value && iconRight && ' '}
          {iconRight && <i className={`fa ${iconRight} wm-color-secondary`} />}
        </Field>
        {imgRight && <img className='img-right' src={imgRight} />}
      </div>
    )
  }
}

export default FormSelect
