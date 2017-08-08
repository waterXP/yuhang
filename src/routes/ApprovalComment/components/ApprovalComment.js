import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import ModalTextarea from '@/components/ModalTextarea'
import { hashHistory } from 'react-router'

class ApprovalDetail extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
  }
  modalClose = () => {
    const { id, type } = this.props.query
    if (history.length > 0) {
      hashHistory.goBack()
    } else {
      goLocation({
        pathname: '/approval/detail',
        query: {
          id,
          type
        }   
      })
    }
  }
  modalConfirm = (v) => {
    const { addComment, query } = this.props
    addComment(+query.id, v, this.modalClose)
  }
  render () {
    const { isBusy } = this.props
    return (
      <ModalTextarea
        text=''
        placeholder='说点什么吧……'
        handleClick={this.modalConfirm}
        cancel={this.modalClose}
        isBusy={ isBusy }
      />
    )
  }
}

export default ApprovalDetail
