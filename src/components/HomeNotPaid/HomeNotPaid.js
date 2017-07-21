import React, { Component } from 'react'
import HomeNotPaidTotal from '../HomeApproveList/HomeApproveTotal'
import HomeNotPaidCell from './HomeNotPaidCell'
import PropTypes from 'prop-types'
import './HomeNotPaid.scss'

class HomeNotPaid extends Component {
  componentDidMount () {
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
  render () {
    let { approveSumMoney, noMore, approve } = this.props
    let notPaidList = []
    let waiteTicketHtml = []
    let waitePaidHtml = []
    let refusePaidHtml = []
    let sumMoneyHtml = ''
    if (approve) {
      let sumMoney = approveSumMoney
      if (sumMoney) {
        sumMoneyHtml = sumMoney
      } else {
        sumMoneyHtml = 0
      }
      if (approve.list) {
        notPaidList = approve.list
      }
      if (notPaidList) {
        notPaidList.map((cur, index, arr) => {
          if (cur.status === 5) {
            waiteTicketHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          } else if (cur.status === 7) {
            waitePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          } else {
            refusePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          }
        })
      }
    }
    return (
      <div className='wm-homeNotPaid' ref='notPaidList'>
        <HomeNotPaidTotal total={sumMoneyHtml} />
        <ul className='waitePaidFirst'>
          {waiteTicketHtml}
        </ul>
        <ul className='waitePaid'>
          {waitePaidHtml}
        </ul>
        <ul className='waitePaid'>
          {refusePaidHtml}
        </ul>
        {noMore &&
          <div className='loadMore'>没有更多</div>
        }
      </div>
    )
  }
}
HomeNotPaid.propTypes = {
  approveSumMoney:PropTypes.number.isRequired,
  noMore:PropTypes.bool,
  approve:PropTypes.object,
  getOffsetHeight:PropTypes.func.isRequired
}

export default HomeNotPaid
