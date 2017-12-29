import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Toast.scss'

import { toastType } from '@/lib/enums'

class Toast extends Component {
  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    handleClose: PropTypes.func,
    title: PropTypes.string
  }

  render () {
    const { text, type, handleClose, title } = this.props
    return <div className='yh-toast'>
      <div className='header'>
        <p className='title'>{title || ' '}</p>
        <button
          className='close-button'
          type='button'
          onClick={handleClose}
        >
          <i className='fas fa-times' />
        </button>
      </div>
      <div className={`type ${type || 'normal'}`}><i className={`fas ${toastType[type || 'normal']}`} /></div>
      <div className='content'>{ text }</div>
    </div>
  }
}

export default Toast
