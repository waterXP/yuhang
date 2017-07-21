import React, { Component } from 'react'
import HomeApproveTotal from './HomeApproveTotal.js'
import HomeApproveListCell from './HomeApproveListCell.js'
import PropTypes from 'prop-types'
import './HomeApproveList.scss'
class HomeApproveList extends Component {
  render () {
    let { approve, noMore, approveSumMoney, type, corpId } = this.props
    let approveList = []
    let sumMoney = ''
    let approveListHtml = []
    if (approve) {
      approveList = approve.list
    }
    if (approveSumMoney) {
      sumMoney = approveSumMoney
    } else {
      sumMoney = 0
    }
    if (approveList && approveList !== 0) {
      if (type === 1) {
        approveList.map((cur, index, arr) => {
          approveListHtml.push(
            <HomeApproveListCell key={index} approve={cur} corpId={corpId} />
          )
        })
      }
    }
    return (
      <div className='wm-homeApproveList' ref='approveList'>
        <HomeApproveTotal total={sumMoney} />
        <ul>
          { approveListHtml }
        </ul>
        {
          noMore
          ? <div className='loadMore'>没有更多</div>
          : null
        }
      </div>
    )
  }

  componentDidMount () {
    this.props.getOffsetHeight(this.refs.approveList)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.approveList)
  }
}

HomeApproveList.propTypes = {
  approve:PropTypes.object,
  noMore:PropTypes.bool,
  approveSumMoney:PropTypes.number,
  type:PropTypes.number,
  getOffsetHeight:PropTypes.func,
  corpId:PropTypes.string
}

export default HomeApproveList
