import React from 'react'
import PropTypes from 'prop-types'
import './FormWarning.scss'

const FormWarning = ({ text }) => {
  return <div className='yh-form-warning'>
    <span><i className='fas fa-exclamation-circle' />&nbsp;{ text }</span>
  </div>
}

FormWarning.propTypes = {
  text: PropTypes.string
}

export default FormWarning
