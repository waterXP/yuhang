import React, { Component } from 'react'
import { confirm } from '@/lib/base'
import './HomeDraft.scss'
import HomeDraftCell from './HomeDraftCell'
import HomeRejectCell from './HomeRejectCell'

class HomeDraft extends Component {
  constructor () {
    super()
  }
  render(){
    let { type, noMore, approve } = this.props
    let title = ''
    let titleRight = ''
    let _this = this
    if (type === 6) {
      // 草稿
      title = '最近保存'
    } else if (type === 4) {
      // 已撤回
      title = '提报日期'
    } else if (type === 5) {
      // 已拒绝
      title = '日期'
      titleRight = '进展'
    }
    let list = []
    let listHtml = []
    let noData = false
    let showBtn = false
    if (approve && approve.list) {
      list = approve.list
      if (type === 5) {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeRejectCell
              key={cur.expensesClaimsId}
              undoCell={cur}
              type={type}
              deleteExp={_this.props.deleteExp} />
          )
        })
      } else {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeDraftCell
              key={cur.expensesClaimsId}
              draftCell={cur}
              type={type}
              deleteExp={_this.props.deleteExp} />
          )
        })
      }
      if (approve.pageCount > 1) {
        showBtn = true
      }
    }
    let className = 'wm-draft'
    if (type === 5) {
      className += ' wm-undo'
    }
    return (
      <div className={className} ref='approveList'>
        <header>
          <div>{title}</div>
          <div>金额</div>
          <div>{titleRight}</div>
        </header>
        <ul>{listHtml}</ul>
        {noMore &&
          <div className='loadMore'>没有更多</div>
        }
      </div>
    )
  }

  componentDidMount(){
    let height = this.refs.approveList.offsetHeight
    this.props.getOffsetHeight(this.refs.approveList)
  }
  componentDidUpdate(){
    let height = this.refs.approveList.offsetHeight
    this.props.getOffsetHeight(this.refs.approveList)
  }
}

export default HomeDraft
