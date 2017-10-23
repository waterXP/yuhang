import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReceiptHeader from './ReceiptHeader'
import ReceiptDetails from './ReceiptDetails'
import ReceiptHistory from './ReceiptHistory'
import ReceiptFlow from './ReceiptFlow'
import ReceiptAttchment from './ReceiptAttchment'
import './Receipt.scss'
import ReceiptButtons from './ReceiptButtons'
import { goLocation } from '@/lib/base'

class Receipt extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired,
    type: PropTypes.any,
    deleteExp: PropTypes.func,
    afterApproval: PropTypes.bool,
    reSubmit: PropTypes.bool
  }
  handleClick = (v = '') => {
    const { addComment, data, afterApproval } = this.props
    addComment(data.master.expensesClaimId, v, afterApproval)
  }
  deleteExp = () => {
    const expensesClaimId = this.props.data.master.expensesClaimId
    this.props.deleteExp(expensesClaimId)
  }
  reSubmit = () => {
    const { expensesClaimId, expensesClaimNo } = this.props.data.master
    const url = {
      pathname:'/new',
      query: {
        id: expensesClaimId,
        expensesClaimNo: expensesClaimNo
      }
    }
    goLocation(url)
  }
  render () {
    const { data, type, addComment, reSubmit } = this.props
    const nType = +type
    const allData = data.all || []
    const buttons = reSubmit
      ? [{
          text: '删除',
          func: this.deleteExp
        }, {
          text: '重新提交',
          func: this.reSubmit
        }]
      : [{
          text: '评论',
          func: addComment
        }]
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
          processList={[...data.processList, ...allData]} />
        <div className='fixed-bottom'>
          { buttons &&
            <ReceiptButtons
              btns={buttons}
            />
          }
        </div>
      </div>
    )
  }
}

export default Receipt
