import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalDetail.scss'

import Receipt from '@/components/Receipt'

class ApprovalDetail extends Component {
  static propTypes = {
   getApprovalDetail: PropTypes.func.isRequired,
   addComment: PropTypes.func.isRequired,
   approvalDetail: PropTypes.object.isRequired,
   query: PropTypes.object.isRequired,
   isBusy: PropTypes.bool.isRequired
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
    const { approvalDetail, query, addComment, isBusy } = this.props
    return (
      <div className='wm-approval-detail'>
        { approvalDetail.master
          && (+query.id === approvalDetail.master.expensesClaimId)
          && <Receipt data={ approvalDetail } addComment={ this.commentHandler.bind(this) } isBusy={ isBusy } />
        }
      </div>
    )
  }
}

export default ApprovalDetail