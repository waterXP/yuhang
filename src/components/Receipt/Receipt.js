import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from './ReceiptHeader'
import ReceiptDetails from './ReceiptDetails'
import ReceiptHistory from './ReceiptHistory'
import ReceiptFlow from './ReceiptFlow'
import ReceiptAttchment from './ReceiptAttchment'
import ConfirmButton from '../ConfirmButton'
import './Receipt.scss'
import ReceiptDelete from './ReceiptDelete'
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
    return (
      <div className='wm-receipt'>
        <ReceiptHeader data={data.master} />
        <ReceiptDetails data={data.detailsList} title='明细' />
        { data.approveHistory &&
          <ReceiptHistory data={data.approveHistory} />
        }
        { data.attachmentList && data.attachmentList.length > 0 &&
          <ReceiptAttchment attachmentList={data.attachmentList} />
        }
        <ReceiptFlow
          processList={[...data.processList, ...data.all]} />
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
