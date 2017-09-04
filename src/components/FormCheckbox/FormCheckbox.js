import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormCheckbox.scss'

class FormCheckbox extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.any
  }

  render () {
    const { title, value, name } = this.props
    return (
      <div className='wm-form-checkbox'>
        <label className='checkbox-label'>
          <Field
            name={name}
            component='input'
            type='checkbox'
            value={value}
          />
          { title }
        </label>
      </div>
    )
  }
}

export default FormCheckbox
