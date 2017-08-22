import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import ModalTextarea from '@/components/ModalTextarea'
import { hashHistory } from 'react-router'

class HomeListComment extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    isBusy: PropTypes.bool
  }
  modalClose = () => {
    const { id, fromPage } = this.props.query
    if (history.length > 0) {
      hashHistory.goBack()
    } else {
      if (fromPage.indexOf('/home/approve_detail') > 0) {
        goLocation({
          pathname: `/home/approve_detail/${id}/${type}`
        })
      } else {
        goLocation({
          pathname: '/home/detail',
          query: { id }
        })
      }
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

export default HomeListComment
