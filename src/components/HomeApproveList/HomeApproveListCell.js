import React, { Component } from 'react'
import { dingApproveDetail, dingSend, removeYear, getCash, toast } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeApproveListCell extends Component {
  constructor () {
    super(...arguments)
    this.clickHandler = this::this.clickHandler
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
  clickHandler (event) {
    event.stopPropagation
    ? event.stopPropagation()
    : event.cancelBubble = true
    let dingId = []
    dingId.push(this.props.approve.dingId)
    dingSend(dingId, this.props.corpId)
  }
  showDetail () {
    const { handleInitial, approve } = this.props
    dingApproveDetail(
      approve.dingApproveUrl,
      handleInitial
    )
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
    const { submitTitme, dynamic, sumMoney, username } = this.props.approve
    return (
      <li className='list-cell' onClick={this.showDetail}>
        <span className='tm'>
          <p className='day'>{this.getDay(submitTitme)}</p>
          <p className='date'>{removeYear(submitTitme)}</p>
        </span>
        <div className='info'>
          <p className='name'>{username}</p>
          <p className='status'>{dynamic}</p>
        </div>
        <span className='bill'>{getCash(sumMoney)}</span>
        <span className='flag' onClick={this.clickHandler}>
          <img src='imgs/icon_ding.png' />
        </span>
      </li>
    )
  }
}

HomeApproveListCell.propTypes = {
  approve: PropTypes.object,
  corpId: PropTypes.string,
  handleInitial: PropTypes.func
}

export default HomeApproveListCell
