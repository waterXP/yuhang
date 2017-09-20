import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListButton extends Component {
  static propTypes = {
    img: PropTypes.string,
    text: PropTypes.string.isRequired,
    value: PropTypes.any,
    clickHandler: PropTypes.func
  }
  render () {
    const { img, text, value, clickHandler } = this.props
    return (
      <li className='wm-list-button' onClick={() => clickHandler(value)}>
        <img src={img} />
        <span>{text}</span>
        <img className='icon' src='imgs/icon_arrow.png' />
      </li>
    )
  }
}

export default ListButton
