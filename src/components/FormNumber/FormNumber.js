import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormNumber.scss'

class FormNumber extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    value: PropTypes.string
  }
  render () {
    const { text, name, handlerBlur } = this.props
    return (
      <div className='wm-form-text'>
        <label>{ text }</label>
        <Field name={ name } component='input' type='number' onBlur={ handlerBlur.bind(this) } />
      </div>
    )    
  }
}

export default FormNumber
