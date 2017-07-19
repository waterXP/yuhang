import React, { Component } from 'react'
import { goLocation, removeYear, getCash } from '@/lib/base'

class HomeRejectCell extends Component {
  constructor(){
    super()
    this.showDetail = this.showDetail.bind(this)
  }
  showDetail () {
    let expensesClaimsId = this.props.undoCell.expensesClaimsId
    let url = `/home/approve_detail/${expensesClaimsId}/5`
    goLocation(url)
  }
  render () {
    let cur = this.props.undoCell
    let type = this.props.type
    return (
      <li onClick={this.showDetail}>
        <p>{removeYear(cur.submitTime)}</p>
        <p>{getCash(cur.sumMoney)}</p>
        <p>{cur.approvalPersonName}{cur.statusName}</p>
      </li>
    )
  }
}

export default HomeRejectCell
