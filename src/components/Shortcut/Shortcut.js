import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Shortcut.scss'

class Shortcut extends Component {
  static propTypes = {
    content: PropTypes.array,
    toTop: PropTypes.bool,
    handleClick: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.handleClick = this::this.handleClick
  }
  handleClick (pos) {
    return () => { this.props.handleClick(pos) }
  }
  render () {
    const { content, toTop } = this.props
    return (
      <div className='wm-shortcut'>
        { toTop && <span className='fa fa-angle-up' onClick={this.handleClick(0)}></span> }
        {
          content.map((v) => <span key={v.letter} onClick={this.handleClick(v.pos || 0)}>{v.letter}</span>)
        }
      </div>
    )
  }
}

export default Shortcut
