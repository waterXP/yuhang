import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalInfo.scss'

import { getCash } from '@/lib/base'

class ApprovalInfo extends Component {
  render () {
    const { userName, sumMoney, statusName, submitTime, createdBy, createdAvatar } = this.props    
    let statusClass = 'important'
    return (
      <div className='wm-approval-info'>
        <img src={ createdAvatar } className='avatar' />
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
