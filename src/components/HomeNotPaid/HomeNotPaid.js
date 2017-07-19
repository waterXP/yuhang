import React, { Component } from 'react'
import HomeNotPaidTotal from '../HomeApproveList/HomeApproveTotal'
import HomeNotPaidCell from './HomeNotPaidCell'
import "./HomeNotPaid.scss"

class HomeNotPaid extends Component {
  constructor () {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }
  componentDidMount () {
    let height = this.refs.notPaidList.offsetHeight
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
  componentDidUpdate () {
    let height = this.refs.notPaidList.offsetHeight
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
  clickHandler () {
    this.props.onClick()
  }
  render () {
    let notPaidList = []
    let waiteTicketHtml = []
    let waitePaidHtml = []
    let refusePaidHtml = []
    let sumMoneyHtml = ''
    let showBtn = false
    let noMore = false
    if (this.props.notPaid) {
      let notPaid = this.props.notPaid.data
      let sumMoney = this.props.notPaid.sumMoney
      noMore = this.props.notPaid.noMore
      if (sumMoney) {
        sumMoneyHtml = sumMoney
      }
      if (notPaid) {
        notPaidList = notPaid.list
        if (notPaid.pageCount > 1) {
          showBtn = true
        }
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
      <div className="wm-homeNotPaid" ref='notPaidList'>
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
        {
          noMore &&
          <div className='loadMore'>没有更多</div>
        }
      </div>
    )
  }
}

export default HomeNotPaid
