import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ReceiptDelete.scss'

class ReceiptDelete extends Component {
  render () {
    return (
      <div className='wm-receipt-delete'>
        <a href='javascript:;' onClick={this.props.deleteExp}>删除</a>
        <a href='javascript:;' onClick={this.props.reSubmit}>重新提交</a>
      </div>
    )
  }
}

ReceiptDelete.propTypes = {
  deleteExp: PropTypes.func,
  reSubmit: PropTypes.func
}

export default ReceiptDelete
