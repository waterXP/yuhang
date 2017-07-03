import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormTextArea.scss'

class FormTextArea extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }

  render () {
    const { name, placeholder } = this.props
    return (
      <div className='wm-form-text-area'>
        <Field
          name={name}
          component='textarea'
          placeholder={placeholder} />
      </div>
    )    
  }
}

export default FormTextArea

