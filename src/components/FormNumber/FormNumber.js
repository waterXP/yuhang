import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormNumber.scss'

class FormNumber extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    handlerBlur: PropTypes.func
  }
  render () {
    const { text, name, handlerBlur } = this.props
    return (
      <div className='wm-form-number'>
        <label>{ text }</label>
        <Field
          name={name}
          component='input'
          type='text'
          onBlur={handlerBlur}
        />
      </div>
    )
  }
}

export default FormNumber
