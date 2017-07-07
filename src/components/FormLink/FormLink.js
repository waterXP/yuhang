import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormLink.scss'

class FormLink extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    value: PropTypes.string
  }

  render () {
    const { text, name, icon, iconRight, value } = this.props
    return (
      <div className='wm-form-link'>
        <label>{text}</label>
        <Field name={name} component='button' type='button'>
          {icon && <i className={`fa ${icon}`} />}
          {value}
          {iconRight && ' '}
          {iconRight && <i className={`fa ${iconRight} wm-color-secondary`} />}
        </Field>
      </div>
    )    
  }
}

export default FormLink
