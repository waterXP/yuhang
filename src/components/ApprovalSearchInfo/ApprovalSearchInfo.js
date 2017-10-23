import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalSearchInfo.scss'

import { dingApproveDetail, getCash, goLocation,
  getDate, getHighLightText } from '@/lib/base'

import { isDev } from '@/config'

class ApprovalSearchInfo extends Component {
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
    getApproveUrl: PropTypes.func,
    keyword: PropTypes.string,
    submitTimeStamp: PropTypes.number,
    handleInitial: PropTypes.func
  }
  gotoPage (location) {
    const { tag, dingApproveUrl, expensesClaimsId, getApproveUrl,
      handleInitial } = this.props
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
      return () => dingApproveDetail(dingApproveUrl, handleInitial)
    }
    return () => goLocation(location)
  }
  render () {
    const { userName, sumMoney, statusName, submitTime, createdBy,
      createdAvatar, expensesClaimsId, status, tag, claimNo, remark,
      submitTimeStamp, keyword } = this.props
    return (
      <div
        className={`wm-approval-search-info`}
        onClick={this.gotoPage(
          { pathname: status === 0 ? '/new' : '/approval/detail',
            query: {
              id: expensesClaimsId,
              type: status > 3 || status === -1 ? 'afterApproval' : ''
            }
          }
        )}
      >
        <div className='user-info'>
          <img src={createdAvatar} className='avatar' />
          <div className='info'>
            <p
              className='creater'
              dangerouslySetInnerHTML={getHighLightText(createdBy, keyword)}
            />
            <p className='dt'>{ getDate(submitTimeStamp, 'MM-dd hh:mm') }</p>
          </div>
        </div>
        <div className='approval-info'>
          <p className='username'>
            <span className='info-label'>报销人：</span>
            <span
              className='info-value'
              dangerouslySetInnerHTML={getHighLightText(userName, keyword)}
            />
          </p>
          <p className='number'>
            <span className='info-label'>报销单号：</span>
            <span
              className='info-value'
              dangerouslySetInnerHTML={getHighLightText(claimNo, keyword)}
            />
          </p>
          <p className='bill'>
            <span className='info-label'>金额：</span>
            <span className='info-value'>{ getCash(sumMoney) }</span>
          </p>
          {
            <p className='remark'>
              <span className='info-label'>状态：</span>
              <span className='info-value'>{ statusName || '待审批' }</span>
            </p>
            // <p className='remark'>
            //   <span className='info-label'>备注：</span>
            //   <span
            //     className='info-value'
            //     dangerouslySetInnerHTML={getHighLightText(remark, keyword)}
            //   />
            // </p>
          }
        </div>
      </div>
    )
  }
}

export default ApprovalSearchInfo
