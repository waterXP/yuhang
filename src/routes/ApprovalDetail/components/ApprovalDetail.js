import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalDetail.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

import Receipt from '@/components/Receipt'
import NoData from '@/components/NoData'

class ApprovalDetail extends Component {
  static propTypes = {
    getApprovalDetail: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    approvalDetail: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired,
    isBusy: PropTypes.bool.isRequired
  }

  constructor (props) {
    super(props)
    this.commentHandler = this.commentHandler.bind(this)
  }

  componentDidMount () {
    const { type, id } = this.props.query
    if (id) {
      this.props.getApprovalDetail(id, type)
    }
  }
  commentHandler (id, text) {
    const { type } = this.props.query
    const { addComment } = this.props
    addComment(id, text, type)
  }

  render () {
    const { approvalDetail, query, isBusy } = this.props
    if (approvalDetail && approvalDetail.master) {
      let { userName, deptName } = approvalDetail.master
      let title = ''
      if (userName) {
        title = userName + '的报销单'
      } else {
        title = deptName + '的报销单'
      }
      dingSetTitle(title)
      dingSetNavRight('')
    }
    return (
      <div className='wm-approval-detail'>
        { approvalDetail.master &&
            (+query.id === approvalDetail.master.expensesClaimId)
            ? <Receipt
              data={approvalDetail}
              addComment={this.commentHandler}
              isBusy={isBusy}
              type={approvalDetail.master.status === 2 ||
                approvalDetail.master.status === 3 ? 4 : 0}
            />
            : <NoData type='loading' />
        }
      </div>
    )
  }
}

export default ApprovalDetail
