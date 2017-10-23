import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import './FormLink.scss'

class FormLink extends Component {
  static propTypes = {
    text: PropTypes.string,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
    value: PropTypes.string,
    iconRight: PropTypes.string,
    imgRight: PropTypes.string,
    clickHandler: PropTypes.func
  }
  clickHandler (name) {
    const { clickHandler } = this.props
    if (clickHandler) {
      return this.props.clickHandler.bind(this, name)
    }
  }

  render () {
    const { text, name, icon, iconRight, imgRight, value } = this.props
    return (
      <div className='wm-form-link'>
        <label>{text}</label>
        <Field
          name={name}
          component='button'
          type='button'
          onClick={this.clickHandler(name)}
        >
          {icon && <i className={`fa ${icon}`} />}
          {value}
          {iconRight && ' '}
          {iconRight && <i className={`fa ${iconRight} wm-color-secondary`} />}
        </Field>
        {imgRight && <img className='img-right' src={imgRight} />}
      </div>
    )
  }
}

export default FormLink
