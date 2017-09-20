import React, { Component } from 'react'
import { goLocation, removeYear, getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeRejectCell extends Component {
  constructor () {
    super()
    this.showDetail = this.showDetail.bind(this)
  }
  showDetail () {
    let expensesClaimsId = this.props.undoCell.expensesClaimsId
    let url = `/home/approve/detail/${expensesClaimsId}/5`
    goLocation(url)
  }
  render () {
    let cur = this.props.undoCell
    return (
      <li onClick={this.showDetail}>
        <p>{removeYear(cur.submitTime)}</p>
        <p>{getCash(cur.sumMoney)}</p>
        <p>{cur.approvalPersonName}{cur.statusName}</p>
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
