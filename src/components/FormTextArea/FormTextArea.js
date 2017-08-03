import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormTextArea.scss'

class FormTextArea extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number
  }

  render () {
    const { name, placeholder, maxLength } = this.props
    return (
      <div className='wm-form-text-area need-blur'>
        <Field
          name={name}
          component='textarea'
          placeholder={placeholder}
          maxLength={maxLength} />
      </div>
    )
  }
}

export default FormTextArea

