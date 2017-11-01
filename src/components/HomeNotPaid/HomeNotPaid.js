import React, { Component } from 'react'
import HomeNotPaidTotal from '../HomeApproveTotal'
import HomeNotPaidCell from './HomeNotPaidCell'
import PropTypes from 'prop-types'
import './HomeNotPaid.scss'

class HomeNotPaid extends Component {
  componentDidMount () {
    this.props.getOffsetHeight(this.refs.notPaidList, this.topics)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.notPaidList, this.topics)
  }
  render () {
    let { approveSumMoney, approve, hasScroll } = this.props
    const sumMoney = approveSumMoney || 0
    let lists = []
    let currentMonth = ''
    let topics = []
    const { cPage, pageCount } = approve
    this.topics = topics
    if (approve && approve.list) {
      approve.list.map((v, i, arr) => {
        const month = v.submitTitme.substr(0, 7)
        if (currentMonth !== month) {
          currentMonth = month
          lists.push(
            <li className='list-topic' key={month + '_' + i} ref={(e) => { topics.push(e) }}>
              <span>{month}</span>
            </li>
          )
        }
        lists.push(
          <HomeNotPaidCell notPaid={v} key={i} />
        )
      })
    }
    return (
      <div className='wm-home-not-paid' ref='notPaidList'>
        <HomeNotPaidTotal total={sumMoney} />
        <ul>{ lists }</ul>
        { cPage === pageCount && hasScroll &&
          <div className='loadMore'>已经到底啦〜</div> }
      </div>
    )
  }
}
HomeNotPaid.propTypes = {
  approveSumMoney:PropTypes.number,
  approve:PropTypes.object,
  getOffsetHeight:PropTypes.func.isRequired,
  hasScroll: PropTypes.bool
}

export default HomeNotPaid
