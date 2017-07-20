import React, { Component } from 'react'
import { goLocation, removeYear, getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeNotPaidCell extends Component {
  constructor () {
    super()
    this.showDetail = this.showDetail.bind(this)
  }
  render () {
    let cur = this.props.notPaid
    let submitTime = removeYear(cur.submitTitme)
    let money = getCash(cur.sumMoney)
    return (
      <li onClick={this.showDetail}>
        <p>{submitTime}</p>
        <p>{money}</p>
        <p>{cur.statusName}</p>
      </li>
    )
  }
  showDetail () {
    let expensesClaimsId = this.props.notPaid.expenseClaimId
    let url = `/home/approve_detail/${expensesClaimsId}/2`
    goLocation(url)
  }
}
HomeNotPaidCell.propTypes = {
  notPaid:PropTypes.shape({
    expenseClaimId:PropTypes.number.isRequired
  }).isRequired
}

export default HomeNotPaidCell
