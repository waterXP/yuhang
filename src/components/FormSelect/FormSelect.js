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
    clickHandler: PropTypes.func,
  }

  // section (option) {
  //   switch (option.type) {
  //     case 'text':
  //       return option.text
  //   }
  // }

  render () {
    const { text, name, value, iconRight, clickHandler } = this.props
    return (
      <div className='wm-form-select'>
        <label>{text}</label>
        <Field name={name} component='button' type='button' onClick={ clickHandler }>
          {value}
          {value && iconRight && ' '}
          {iconRight && <i className={`fa ${iconRight} wm-color-secondary`} />}
        </Field>
      </div>
    )    
  }
}

export default FormSelect

