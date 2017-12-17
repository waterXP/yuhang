import React from 'react'
import PropTypes from 'prop-types'
import './Congratulation.scss'

const Congratulation = ({ text }) =>
  <p className='yh-congratulation'>
    <i className='fas fa-check' />
    <span>{ text }</span>
  </p>

Congratulation.propTypes = {
  text: PropTypes.string
}

export default Congratulation
