import React, { Component } from 'react'
import { dingApproveDetail, dingSend, removeYear, getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeApproveListCell extends Component {
  constructor () {
    super()
    this.clickHandler = this.clickHandler.bind(this)
    this.showDetail = this.showDetail.bind(this)
  }
  render () {
    let cur = this.props.approve
    return (
      <li onClick={this.showDetail}>
        <p>{removeYear(cur.submitTitme)}</p>
        <p>{getCash(cur.sumMoney)}</p>
        <p>{cur.dynamic}</p>
        <p onClick={this.clickHandler}>
          <i className='fa fa-thumb-tack' aria-hidden='true' />
        </p>
      </li>
    )
  }
  clickHandler (event) {
    event.stopPropagation
    ? event.stopPropagation()
    : event.cancelBubble = true
    let dingId = []
    dingId.push(this.props.approve.dingId)
    dingSend(dingId)
  }
  showDetail () {
    let dingApproveDetailUrl = this.props.approve.dingApproveUrl
    dingApproveDetail(dingApproveDetailUrl)
  }
}

HomeApproveListCell.propTypes = {
  approve:PropTypes.object
}

export default HomeApproveListCell
