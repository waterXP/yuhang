import React from 'react'
import PropTypes from 'prop-types'
import './FormSubmit.scss'

const FormSubmit = ({ value, handleSubmit }) =>
  <button
    type='button'
    className='yh-form-submit'
    onClick={handleSubmit}
  >
    { value }
  </button>

FormSubmit.propTypes = {
  value: PropTypes.string,
  handleSubmit: PropTypes.func
}

export default FormSubmit
