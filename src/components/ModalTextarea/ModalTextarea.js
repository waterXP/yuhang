import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ModalTextarea.scss'
import NoData from '../NoData'
import { isDev } from '@/config'

import { toast, dingSetMenu } from '@/lib/ddApi'

class ModalTextarea extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    text: PropTypes.string,
    handleClick: PropTypes.func,
    cancel: PropTypes.func,
    isBusy: PropTypes.bool,
    modalRef: PropTypes.func
  }
  // componentDidMount () {
  //   dingSetMenu(
  //     [{
  //       id: 1,
  //       text: '确定'
  //     }],
  //     this.handleClick
  //   )
  // }
  // handleClick = () => {
  //   return this.props.handleClick()
  //   // else {
  //   //   return this.props.handleClick(this.textarea.value)
  //   // }
  // }
  render () {
    const { placeholder, text, cancel, isBusy, modalRef,
      handleClick } = this.props
    return (
      <div className='wm-modal-textarea'>
        { isBusy && <NoData type='loading' /> }
        <div className='container'>
          <textarea
            ref={modalRef}
            placeholder={placeholder}
            defaultValue={text}
            disabled={isBusy}
            rows='10'
          />
          {
            isDev && <button
              className='btn-left'
              type='button'
              disabled={isBusy}
              onClick={cancel}
            >取消</button>
          }
          {
            isDev && <button
              className='btn-right'
              type='button'
              disabled={isBusy}
              onClick={handleClick}
            >确定</button>
          }
        </div>
      </div>
    )
  }
}

export default ModalTextarea
