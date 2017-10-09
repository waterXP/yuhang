import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ListTopic.scss'

class ListTopic extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  render () {
    const { text, className } = this.props
    return (
      <div className={`wm-list-topic${className ? ' ' + className : ''}`}>
        <span>{text}</span>
      </div>
    )
  }
}

export default ListTopic
