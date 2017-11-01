import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalDetail.scss'
import { goLocation } from '@/lib/base'
import { dingSetTitle, dingSetNavRight } from '@/lib/ddApi'

import Receipt from '@/components/Receipt'
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

  render () {
    const { approvalDetail, query, isBusy, deleteExp } = this.props
    const status = approvalDetail.master && approvalDetail.master.status
    // if (approvalDetail && approvalDetail.master) {
    //   let { userName, deptName } = approvalDetail.master
    //   let title = ''
    //   if (userName) {
    //     title = userName + '的报销单'
    //   } else {
    //     title = deptName + '的报销单'
    //   }
    //   dingSetTitle(title)
    //   dingSetNavRight('')
    // }
    const reSubmit = approvalDetail.isMy && (status === 2 || status === 3)
    return (
      <div className='wm-approval-detail'>
        { approvalDetail.master &&
          (+query.id === approvalDetail.master.expensesClaimId)
          ? <Receipt
              data={approvalDetail}
              addComment={this.commentHandler}
              deleteExp={deleteExp}
              isBusy={isBusy}
              afterApproval={ status < 1 || status > 3 }
              reSubmit={ reSubmit }
            />
          : <NoData type='loading' />
        }
      </div>
    )
  }
}

export default ApprovalDetail
