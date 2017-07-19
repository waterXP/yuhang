import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormText.scss'

class FormText extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired
  }

  render () {
    const { text, name } = this.props
    return (
      <div className='wm-form-text'>
        <label>{text}</label>
        <Field name={name} component='input' type='text' />
      </div>
    )
  }
}

export default FormText
