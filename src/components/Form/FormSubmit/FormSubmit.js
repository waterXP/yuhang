import React from 'react'
import PropTypes from 'prop-types'
import './FormSubmit.scss'

const FormSubmit = ({ value, handleSubmit, disabled }) =>
  <button
    type='button'
    className='yh-form-submit'
    onClick={handleSubmit}
    disabled={disabled}
  >
    { disabled
      ? <span>提交中&nbsp;<i className='fas fa-circle-notch fa-spin' /></span>
      : value
    }
  </button>

FormSubmit.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func,
  disabled: PropTypes.bool
}

export default FormSubmit
