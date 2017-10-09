import React, { Component } from 'react'
import { goLocation, removeYear, getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeRejectCell extends Component {
  constructor () {
    super(...arguments)
    this.showDetail = this::this.showDetail
    this.getDay = this::this.getDay
    const c = new Date()
    let month = c.getMonth() + 1
    month = month < 10 ? '0' + month : '' + month
    let date = c.getDate()
    date = date < 10 ? '0' + date : '' + date
    this.state = {
      today: new Date(`${c.getFullYear()}-${month}-${date}`)
    }
  }
  showDetail () {
    const expensesClaimsId = this.props.undoCell.expensesClaimsId
    goLocation(`/home/approve/detail/${expensesClaimsId}/5`)
  }
  getDay (submitTitme) {
    const { today } = this.state
    const day = [
      '周日',
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六'
    ]
    const d = new Date(submitTitme)
    const sub = today - d
    if (sub === 0) {
      return '今天'
    } else if (sub === 86400000) {
      return '昨天'
    }
    return day[d.getDay()]
  }
  render () {
    const { submitTime, approvalPersonName,
      sumMoney, statusName } = this.props.undoCell
    return (
      <li className='list-cell' onClick={this.showDetail}>
        <span className='tm'>
          <p className='day'>{this.getDay(submitTime)}</p>
          <p className='date'>{removeYear(submitTime)}</p>
        </span>
        <div className='info'>
          <p className='name reject'>{approvalPersonName}</p>
          <p className='status'>{statusName}</p>
        </div>
        <span className='bill'>{getCash(sumMoney)}</span>
        <span className='flag'>
          <img src='imgs/icon_arrow.png' />
        </span>
      </li>
    )
  }
}
HomeRejectCell.propTypes = {
  undoCell:PropTypes.shape({
    expensesClaimsId:PropTypes.number.isRequired
  }).isRequired
}

export default HomeRejectCell
