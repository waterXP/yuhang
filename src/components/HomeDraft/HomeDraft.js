import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './HomeDraft.scss'
import HomeDraftCell from './HomeDraftCell'
import HomeRejectCell from './HomeRejectCell'

class HomeDraft extends Component {
  constructor () {
    super()
    this.deleteExp = this.deleteExp.bind(this)
  }
  render () {
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
    if (approve && approve.list) {
      list = approve.list
      if (type === 5) {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeRejectCell
              key={cur.expensesClaimsId}
              undoCell={cur}
              type={type} />
          )
        })
      } else {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeDraftCell
              key={cur.expensesClaimsId}
              draftCell={cur}
              type={type}
              deleteExp={_this.deleteExp} />
          )
        })
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

  deleteExp (expensesClaimsId) {
    this.props.deleteExp(expensesClaimsId)
  }

  componentDidMount () {
    this.props.getOffsetHeight(this.refs.approveList)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.approveList)
  }
}

HomeDraft.propTypes = {
  type:PropTypes.number.isRequired,
  approve:PropTypes.object,
  noMore:PropTypes.bool.isRequired,
  deleteExp:PropTypes.func,
  getOffsetHeight:PropTypes.func.isRequired
}

export default HomeDraft
