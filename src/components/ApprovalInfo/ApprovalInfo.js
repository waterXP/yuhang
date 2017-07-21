import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalInfo.scss'

import { dingApproveDetail, getCash, goLocation } from '@/lib/base'

import { isDev } from '@/config'

class ApprovalInfo extends Component {
  static propTypes = {
    userName: PropTypes.string,
    sumMoney: PropTypes.any,
    statusName: PropTypes.string,
    submitTime: PropTypes.string,
    createdBy: PropTypes.string,
    createdAvatar: PropTypes.string,
    expensesClaimsId: PropTypes.number,
    tag: PropTypes.number,
    status: PropTypes.number,
    dingApproveUrl: PropTypes.string
  }
  gotoPage (location) {
    const { tag, dingApproveUrl } = this.props
    if (!isDev && tag === 1) {
      return () => dingApproveDetail(dingApproveUrl)
    }
    return () => goLocation(location)
  }
  render () {
    const { userName, sumMoney, statusName, submitTime, createdBy,
      createdAvatar, expensesClaimsId, status } = this.props
    let statusClass = 'important'
    return (
      <div
        className='wm-approval-info'
        onClick={this.gotoPage(
          { pathname: status === 0 ? '/new' : '/approval/detail',
            query: {
              id: expensesClaimsId,
              type: status > 3 ? 'afterApproval' : ''
            }
          }
        )}
      >
        <img src={createdAvatar} className='avatar' />
        <div className='info'>
          <span className='wm-color-secondary'>{ submitTime }</span>
          <h5>{ createdBy }的报销审批</h5>
          <p>金额：{ getCash(sumMoney) }元</p>
          <p>报销人：{ userName }</p>
          <p className={`wm-color-${statusClass}`}>
            { statusName || '待审批' }
          </p>
        </div>
      </div>
    )
  }
}

export default ApprovalInfo
