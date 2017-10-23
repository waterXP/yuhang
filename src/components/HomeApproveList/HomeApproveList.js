import React, { Component } from 'react'
import HomeApproveTotal from '../HomeApproveTotal'
import HomeApproveListCell from './HomeApproveListCell'
import PropTypes from 'prop-types'
import './HomeApproveList.scss'

class HomeApproveList extends Component {
  componentDidMount () {
    this.props.getOffsetHeight(this.refs.approveList, this.topics)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.approveList, this.topics)
  }
  render () {
    const { approve, noMore, approveSumMoney,
      type, corpId, handleInitial } = this.props
    const sumMoney = approveSumMoney || 0
    let lists = []
    let currentMonth = ''
    let topics = []
    this.topics = topics
    if (approve && approve.list) {
      approve.list.map((v, i) => {
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
          <HomeApproveListCell
            key={i}
            approve={v}
            corpId={corpId}
            handleInitial={handleInitial}
          />
        )
      })
    }
    return (
      <div className='wm-home-approve-list' ref='approveList'>
        <HomeApproveTotal total={sumMoney} />
        <ul>{ lists }</ul>
        { noMore && <div className='loadMore'>没有更多</div> }
      </div>
    )
  }
}

HomeApproveList.propTypes = {
  approve: PropTypes.object,
  noMore: PropTypes.bool,
  approveSumMoney: PropTypes.number,
  type: PropTypes.number,
  getOffsetHeight: PropTypes.func,
  corpId: PropTypes.string,
  handleInitial: PropTypes.func
}

export default HomeApproveList
