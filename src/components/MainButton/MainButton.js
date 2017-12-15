import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './MainButton.scss'

class MainButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    handleClick: PropTypes.func
  }

  render () {
    const { children, handleClick } = this.props
    return <button
        className='yh-main-button'
        onClick={handleClick}
      >
        { children }
      </button>
  }
}

export default MainButton
