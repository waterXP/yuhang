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
    let { approveSumMoney, noMore, approve } = this.props
    const sumMoney = approveSumMoney || 0
    let lists = []
    let currentMonth = ''
    let topics = []
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
        { noMore && <div className='loadMore'>没有更多</div> }
      </div>
    )
  }
}
HomeNotPaid.propTypes = {
  approveSumMoney:PropTypes.number,
  noMore:PropTypes.bool,
  approve:PropTypes.object,
  getOffsetHeight:PropTypes.func.isRequired
}

export default HomeNotPaid
