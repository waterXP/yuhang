import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalDetail.scss'
import { goLocation } from '@/lib/base'
import { confirm, dingSetTitle, dingSetNavRight } from '@/lib/ddApi'

import Receipt from '@/components/Receipt'
import ReceiptButtons from '@/components/Receipt/ReceiptButtons'
import NoData from '@/components/NoData'

class ApprovalDetail extends Component {
  static propTypes = {
    getApprovalDetail: PropTypes.func.isRequired,
    approvalDetail: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    isBusy: PropTypes.bool.isRequired
  }

  constructor () {
    super(...arguments)
    this.commentHandler = this::this.commentHandler
    this.deleteExp = this::this.deleteExp
    this.reSubmit = this::this.reSubmit
  }

  componentDidMount () {
    dingSetTitle('报销单详情')
    dingSetNavRight('')
    const { type, id } = this.props.query
    if (id) {
      this.props.getApprovalDetail(id, type)
    }
  }
  commentHandler () {
    const { id, type } = this.props.query
    goLocation({
      pathname: '/approval/comment',
      query: {
        id,
        type
      }
    })
  }
  deleteExp () {
    const { expensesClaimId } = this.props.approvalDetail.master
    const message = '请确认是否删除此报销单'
    const title = '提示'
    confirm(
      message,
      title,
      this.props.deleteExp.bind(
        null, expensesClaimId
      )
    )
  }
  reSubmit () {
    const { expensesClaimId, expensesClaimNo } = this.props.approvalDetail.master
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
    const { approvalDetail, query, isBusy, deleteExp } = this.props
    const status = approvalDetail.master && approvalDetail.master.status

    const buttons = approvalDetail.isMy && (status === 2 || status === 3)
      ? [{
          text: '删除',
          func: this.deleteExp
        }, {
          text: '重新提交',
          func: this.reSubmit
        }]
      : [{
          text: '评论',
          func: this.commentHandler
        }]
    return (
      <div className='wm-approval-detail'>
        { approvalDetail.master &&
          (+query.id === approvalDetail.master.expensesClaimId)
          ? <div className='content'>
              <Receipt
                data={approvalDetail}
                isBusy={isBusy}
              />
              <ReceiptButtons
                btns={buttons}
              />
            </div>
          : <NoData type='loading' />
        }
      </div>
    )
  }
}

export default ApprovalDetail
