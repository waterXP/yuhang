import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalTextarea.scss'

import { toast } from '@/lib/base'

class ModalTextarea extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func,
    cancel: PropTypes.func
  }
  handleClick = () => {
    if (!this.textarea.value) {
      toast('请输入评论内容')
    } else {
      return this.props.handleClick(this.textarea.value)
    }
  }
  render () {
    const { placeholder, text, cancel } = this.props
    return (
      <div className='wm-modal-textarea'>
        <div className='container'>
          <textarea
            ref={(e) => { this.textarea = e }}
            placeholder={placeholder}
            defaultValue={text}
            rows='10'
          />
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
        </div>
      </div>
    )
  }
}

export default ModalTextarea
