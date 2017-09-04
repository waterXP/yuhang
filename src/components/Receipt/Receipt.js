import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from '../ReceiptHeader'
import ReceiptDetails from '../ReceiptDetails'
import ReceiptHistory from '../ReceiptHistory'
import ReceiptFlow from '../ReceiptFlow'
import ConfirmButton from '../ConfirmButton'
import './Receipt.scss'
import ReceiptDelete from '../ReceiptDelete'
import { goLocation } from '@/lib/base'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    type: PropTypes.any,
    deleteExp: PropTypes.func
  }
  handleClick = (v = 'just test') => {
    let { type, addComment, data } = this.props
    let afterApproval = true
    let nType = +type
    if (nType === 2) {
      afterApproval = true
    } else if (nType === 4 || nType === 5) {
      afterApproval = false
    }
    addComment(data.master.expensesClaimId, v, afterApproval)
  }
  // modalOpen = () => this.setState({ showModal: true })
  // modalClose = () => this.setState({ showModal: false })
  // modalConfirm = (v) => {
  //   this.handleClick(v)
  //   this.modalClose()
  // }
  render () {
    const { data, type, addComment } = this.props
    let nType = +type
    let names = [
      {
        name: '删除',
        fun: this.deleteExp
      }, {
        name: '重新提交',
        fun: this.reSubmit
      }
    ]
    if (!data.all) {
      data.all = []
    }
    // console.log(data)
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} title='明细' />
        { data.approveHistory && <ReceiptHistory data={data.approveHistory} title='审批历史记录' /> }
        <ReceiptFlow
          processList={[...data.processList, ...data.all]}
          attachmentList={data.attachmentList}
        />
        <div className='fixed-bottom'>
          { nType === 5 || nType === 4
            ? <ReceiptDelete
              names={names}
            />
            : <ConfirmButton
              text='评论'
              handleClick={addComment}
            />
          }
        </div>
      </div>
    )
  }
  deleteExp = () => {
    let expensesClaimId = this.props.data.master.expensesClaimId
    this.props.deleteExp(expensesClaimId)
  }
  reSubmit = () => {
    let { expensesClaimId, expensesClaimNo } = this.props.data.master
    let url = {
      pathname:'/new',
      query: {
        id: expensesClaimId,
        expensesClaimNo: expensesClaimNo
      }
    }
    goLocation(url)
  }
}

export default Receipt
