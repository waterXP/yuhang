import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MainButton.scss'

class MainButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func,
    disabled: PropTypes.bool
  }

  render () {
    const { children, handleClick, disabled } = this.props
    return <button
      className='yh-main-button'
      onClick={handleClick}
      disabled={disabled}
    >
      { children }
    </button>
  }
}

export default MainButton
