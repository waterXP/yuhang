import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormLabel.scss'

class FormLabel extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string
  }

  render () {
    const { text, name, value } = this.props
    return (
      <div className='wm-form-label'>
        <label>{text}</label>
        <Field
          name={name}
          component='label'
        >{value}</Field>
      </div>
    )
  }
}

export default FormLabel
