import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalDetail.scss'

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
    console.log(approvalDetail)
    return (
      <div className='wm-approval-detail'>
        { approvalDetail.master &&
            (+query.id === approvalDetail.master.expensesClaimId)
            ? <Receipt
              data={approvalDetail}
              addComment={this.commentHandler}
              isBusy={isBusy}
              type={approvalDetail.master.status}
            />
            : <NoData type='loading' />
        }
      </div>
    )
  }
}

export default ApprovalDetail
