import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalTextarea.scss'

import { toast } from '@/lib/base'

class ModalTextarea extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func,
    cancel: PropTypes.func,
    isBusy: PropTypes.bool
  }
  handleClick = () => {
    if (!this.textarea.value) {
      toast('请输入评论内容')
    } else {
      return this.props.handleClick(this.textarea.value)
    }
  }
  render () {
    const { placeholder, text, cancel, isBusy } = this.props
    return (
      <div className='wm-modal-textarea'>
        <div className='container'>
          <textarea
            ref={(e) => { this.textarea = e }}
            placeholder={placeholder}
            defaultValue={text}
            disabled={isBusy}
            rows='10'
          />
          <button
            className='btn-left'
            type='button'
            disabled={isBusy}
            onClick={cancel}
          >取消</button>
          <button
            className='btn-right'
            type='button'
            disabled={isBusy}
            onClick={this.handleClick}
          >确定</button>
        </div>
      </div>
    )
  }
}

export default ModalTextarea
