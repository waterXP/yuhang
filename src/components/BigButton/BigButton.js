import React from 'react'
import PropTypes from 'prop-types'
import './BigButton.scss'

const BigButton = ({ text, handleClick }) =>
  <button
    className='yh-big-button'
    type='button'
    onClick={handleClick}
  >
    { text }
  </button>

BigButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func
}

export default BigButton
