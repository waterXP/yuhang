import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SendHistoryList.scss'
import { getCash, goLocation, removeYear } from '@/lib/base'

class SendHistoryList extends Component {
  static propTypes = {
    datas: PropTypes.array,
    pathname: PropTypes.string.isRequired,
    setTopics: PropTypes.func
  }
  constructor () {
    super(...arguments)
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
  gotoLocation (location) {
    return () => goLocation(location)
  }
  componentDidMount () {
    this.props.setTopics(this.topics)
  }
  componentDidUpdate () {
    this.props.setTopics(this.topics)
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
    const { thead, datas, pathname } = this.props
    let lists = []
    let currentMonth = ''
    let topics = []
    this.topics = topics
    datas.map((v, i, arr) => {
      const month = v.paidTime.substr(0, 7)
      if (currentMonth !== month) {
        currentMonth = month
        lists.push(
          <li className='list-topic' key={month + '_' + i} ref={(e) => { topics.push(e) }}>
            <span>{month}</span>
          </li>
        )
      }
      lists.push(
        <li
          className='list-cell'
          key={v.claimId}
          onClick={
            this.gotoLocation({
              pathname: 'home/history/' + pathname,
              query: { id: v.claimId }
            })
          }
        >
          <span>
            <p className='day'>{this.getDay(v.paidTime)}</p>
            <p className='date'>{removeYear(v.paidTime)}</p>
          </span>
          <span>{v.paidPerson}已发放</span>
          <span>{getCash(v.actualMoney)}</span>
          <span>
            <img src='imgs/icon_arrow.png' />
          </span>
        </li>
      )
    })
    return (
      <ul className='wm-send-history-list'>
          { lists }
      </ul>
    )
  }
}

export default SendHistoryList
