import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { goLocation, confirm, removeYear, getCash } from '@/lib/base'

class HomeDraftCell extends Component {
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
    let type = this.props.type
    let title = '提示'
    let message = '请确认是否删除此草稿'
    if (type === 4) {
      message = '请确认是否删除此报销单'
    }
    let deleteExp = this.props.deleteExp
    let expensesClaimsId = this.props.draftCell.expensesClaimsId
    confirm(message, title, deleteExp.bind(this, expensesClaimsId))
  }
  showDetail () {
    let type = this.props.type
    let expensesClaimsId = this.props.draftCell.expensesClaimsId
    let url = ''
    if (type === 4) {
      url = `/home/approve/detail/${expensesClaimsId}/+4`
    } else {
      // 草稿
      url = {
        pathname:'/new',
        query: {
          id: expensesClaimsId
        }
      }
    }
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
    const { submitTime, updatedAt, sumMoney, createdBy,
      approvalPersonName, statusName } = this.props.draftCell
    const type = this.props.type
    const dt = type === 4 ? submitTime : updatedAt
    const user = type === 4 ? approvalPersonName : createdBy + '的'
    return (
      <li className='list-cell' onClick={this.showDetail} >
        <span>
          <p className='day'>{this.getDay(dt)}</p>
          <p className='date'>{removeYear(dt)}</p>
        </span>
        <span>{user}{statusName}</span>
        <span>{getCash(sumMoney)}</span>
        {
          // <span>
          //   <a href='javascript:;' onClick={this.clickHandler} >
          //     删除
          //   </a>
          // </span>
        }
        <span>
          <img src='imgs/icon_arrow.png' />
        </span>
      </li>
    )
  }
}
HomeDraftCell.propTypes = {
  draftCell:PropTypes.object.isRequired,
  type:PropTypes.number.isRequired,
  deleteExp:PropTypes.func.isRequired
}

export default HomeDraftCell
