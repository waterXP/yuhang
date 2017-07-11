import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalInfo.scss'

import { getCash } from '@/lib/base'
import testImg from '@/routes/SettingsAccounts/assets/Duck.jpg'

class ApprovalInfo extends Component {
  render () {
    console.log(this.props)
    const { name, bill, status } = this.props
    let statusText = '待审批'
    let statusClass = 'important'
    switch ( status ) {
      case 2:
        statusText = '已审批'
        statusClass = 'correct'
        break
    }
    return (
      <div className='wm-approval-info'>
        <img src={ testImg } className='avatar' />
        <div className='info'>
          <span className='wm-color-secondary'>2017.04.01</span>
          <h5>{ name }的报销审批</h5>
          <p>金额：{ getCash(bill) }元</p>
          <p>报销人：{ name }</p>
          <p className={`wm-color-${statusClass}`}>
            { statusText }
          </p>
        </div>
      </div>
    )
  }
}

export default ApprovalInfo
