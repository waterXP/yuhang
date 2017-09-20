import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RowButton extends Component {
  static propTypes = {
    img: PropTypes.string,
    text: PropTypes.string.isRequired,
    value: PropTypes.any,
    clickHandler: PropTypes.func
  }
  render () {
    const { img, text, value, clickHandler } = this.props
    return (
      <div className='wm-row-button' onClick={() => clickHandler(value)}>
        <img src={img} />
        <p>{text}</p>
      </div>
    )
  }
}

export default RowButton
