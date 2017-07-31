import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormNumber.scss'

class FormNumber extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    handlerBlur: PropTypes.func,
    placeholder: PropTypes.string
  }
  handleFocus (e) {
    e.target.select()
  }
  render () {
    const { text, name, handlerBlur, placeholder } = this.props
    return (
      <div className='wm-form-number'>
        <label>{ text }</label>
        <Field
          name={name}
          component='input'
          type='tel'
          onFocus={this.handleFocus}
          onBlur={handlerBlur}
          placeholder={placeholder}
        />
      </div>
    )
  }
}

export default FormNumber
