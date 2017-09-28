import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import ModalTextarea from '@/components/ModalTextarea'
import { hashHistory } from 'react-router'

class HomeComment extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    isBusy: PropTypes.bool
  }
  modalClose = () => {
    const { id, type } = this.props.query
    if (history.length > 0) {
      hashHistory.goBack()
    } else {
      goLocation({
        pathname: `/home/detail/${id}/${type}`
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
        isBusy={isBusy}
      />
    )
  }
}

export default HomeComment
