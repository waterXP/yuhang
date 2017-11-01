import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation } from '@/lib/base'
import ModalTextarea from '@/components/ModalTextarea'
import { hashHistory } from 'react-router'
import { dingSetTitle, dingSetNavRight, toast } from '@/lib/ddApi'

class HomeComment extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    isBusy: PropTypes.bool
  }
  constructor () {
    super(...arguments)
    this.modalConfirm = this::this.modalConfirm
  }
  componentDidMount () {
    dingSetTitle('发表评论')
    // dingSetMenu(
    //   '确定',
    //   this.modalConfirm,
    //   true
    // )
    dingSetNavRight(
      '确定',
      this.modalConfirm,
      true
    )
  }
  // componentDidUpdate () {
  //   dingSetTitle('发表评论')
  //   dingSetMenu(
  //     '确定',
  //     this.modalConfirm,
  //     true
  //   )    
  // }
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
  modalConfirm = () => {
    const { value } = this.modalRef
    if (!value) {
      toast('请输入评论内容')
      return
    }
    if (value.length > 200) {
      toast('字数不能超过200')
      return
    }
    const { addComment, query } = this.props
    addComment(+query.id, value, this.modalClose)
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
        modalRef={el => this.modalRef = el}
      />
    )
  }
}

export default HomeComment
