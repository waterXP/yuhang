import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalInfo.scss'

import { dingApproveDetail, getCash, goLocation,
  getTimeFromStr, getDate } from '@/lib/base'

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
    dingApproveUrl: PropTypes.string,
    getApproveUrl: PropTypes.func
  }
  gotoPage (location) {
    const { tag, dingApproveUrl, expensesClaimsId, getApproveUrl } = this.props
    const { status } = this.props
    let isDingDetail = false
    switch (tag) {
      case 1:
        isDingDetail = true
        break
      case 2:
        if (status === 1) {
          isDingDetail = true
        }
        break
      case 4:
        if (status === 1 || status === 2 || status === 3) {
          isDingDetail = true
        }
    }
    if (!isDev && isDingDetail) {
      if (!dingApproveUrl) {
        return () => getApproveUrl(expensesClaimsId, dingApproveDetail)
      }
      return () => dingApproveDetail(dingApproveUrl)
    }
    return () => goLocation(location)
  }
  render () {
    const { userName, sumMoney, statusName, submitTime, createdBy,
      createdAvatar, expensesClaimsId, status, tag,
      submitTimeStamp } = this.props
    let statusClass = 'important'
    if (tag === 3) {
      statusClass = 'r-font'
    } else {
      switch (status) {
        case -2:
        case -1:
          statusClass = 'error'
          break
        case 0:
          statusClass = 'r-font'
          break
        case 1:
          statusClass = 'warning'
          break
        case 2:
          statusClass = 'r-font'
          break
        case 3:
          statusClass = 'error'
          break
        case 4:
          statusClass = 'correct'
          break
        case 5:
          statusClass = 'warning'
          break
        case 6:
          statusClass = 'error'
          break
        case 7:
          statusClass = 'warning'
          break
        case 8:
          statusClass = 'error'
          break
        case 9:
          statusClass = 'correct'
      }
    }
    let className = tag ? 'tag-' + tag : 'tag-1'
    const strDT = getTimeFromStr(submitTime)
    let showDT = submitTime
    if (strDT.special) {
      showDT = strDT.special
      if (strDT.special === '今天') {
        showDT = getDate(submitTimeStamp, 'hh:mm')
      }
    }
    return (
      <div
        className={`wm-approval-info ${className}`}
        onClick={this.gotoPage(
          { pathname: status === 0 ? '/new' : '/approval/detail',
            query: {
              id: expensesClaimsId,
              type: status > 3 || status === -1 ? 'afterApproval' : ''
            }
          }
        )}
      >
        <img src={createdAvatar} className='avatar' />
        <div className='info'>
          <p className='title'>{ createdBy }</p>
          <p className='name'>报销人：{ userName }</p>
          <p>
            <span className='name'>金额：</span>
            <span className='bill'>{ getCash(sumMoney) }</span>
          </p>
        </div>
        <div className='info-r'>
          <p className='dt'>{ showDT }</p>
          <p className={`status color-${statusClass}`}>
            { statusName }
          </p>
        </div>
      </div>
    )
  }
}

export default ApprovalInfo
