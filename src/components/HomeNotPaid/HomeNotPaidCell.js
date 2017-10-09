import React, { Component } from 'react'
import { goLocation, removeYear, getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeNotPaidCell extends Component {
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
    let expensesClaimsId = this.props.notPaid.expenseClaimId
    let url = `/home/approve/detail/${expensesClaimsId}/2`
    goLocation(url)
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
    const {submitTitme, sumMoney, statusName} = this.props.notPaid
    return (
      <li className='list-cell' onClick={this.showDetail}>
        <span className='tm'>
          <p className='day'>{this.getDay(submitTitme)}</p>
          <p className='date'>{removeYear(submitTitme)}</p>
        </span>
        <span className='info'>{statusName}</span>
        <span className='bill'>{getCash(sumMoney)}</span>
        <span className='flag'>
          <img src='imgs/icon_arrow.png' />
        </span>
      </li>
    )
  }
}
HomeNotPaidCell.propTypes = {
  notPaid:PropTypes.shape({
    expenseClaimId:PropTypes.number.isRequired
  }).isRequired
}

export default HomeNotPaidCell
