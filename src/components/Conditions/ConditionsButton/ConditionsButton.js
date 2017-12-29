import React from 'react'
import PropTypes from 'prop-types'
import './ConditionsButton.scss'

const ConditionsButton = ({ text, children, onClick, disabled }) =>
  <button
    className='yh-conditions-button'
    type='button'
    onClick={onClick}
    disabled={disabled}
  >
    { children || text }
  </button>

ConditionsButton.propTypes = {
  text: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default ConditionsButton
