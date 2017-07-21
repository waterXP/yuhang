import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalTextarea.scss'

class ModalTextarea extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func,
    cancel: PropTypes.func
  }
  handleClick = () => this.props.handleClick(this.textarea.value)
  render () {
    const { placeholder, text, cancel } = this.props
    return (
      <div className='wm-modal-textarea'>
        <div className='container'>
          <button
            className='btn-left'
            type='button'
            onClick={cancel}
          >取消</button>
          <button
            className='btn-right'
            type='button'
            onClick={this.handleClick}
          >确定</button>
          <textarea
            ref={(e) => { this.textarea = e }}
            placeholder={placeholder}
            defaultValue={text}
            rows='10'
          />
        </div>
      </div>
    )
  }
}

export default ModalTextarea
