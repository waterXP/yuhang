import React, { Component } from 'react'
import { confirm } from '@/lib/base'
import './HomeDraft.scss'
import HomeDraftCell from './HomeDraftCell'
import HomeRejectCell from './HomeRejectCell'

class HomeDraft extends Component {
  constructor () {
    super()
  }
  componentDidMount () {
    let height = this.refs.draftList.offsetHeight
    this.props.getOffsetHeight(this.refs.draftList)
  }
  componentDidUpdate () {
    let height = this.refs.draftList.offsetHeight
    this.props.getOffsetHeight(this.refs.draftList)
  }
  render () {
    let { type,noMore } = this.props
    let title = ''
    let titleRight = ''
    let _this = this
    if (type === 1) {
      title = '最近保存'
    } else if (type === 2) {
      title = '提报日期'
    } else if (type === 3) {
      title = '日期'
      titleRight = '进展'
    }
    let data = this.props.reject
    let list = []
    let listHtml = []
    let noData = false
    let showBtn = false
    if (data && data.data) {
      list = data.data
      if (type === 3) {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeRejectCell
              key={index}
              undoCell={cur}
              type={type}
              deleteExp={_this.props.deleteExp}
            />
          )
        })
      } else {
        list.map((cur, index, arr) => {
          listHtml.push(
            <HomeDraftCell
              key={index}
              draftCell={cur}
              type={type}
              deleteExp={_this.props.deleteExp}
            />
          )
        })
      }
      if (data.page.total_page > 1) {
        showBtn = true
      }
    }
    let className = 'wm-draft'
    if (type === 3) {
      className += ' wm-undo'
    }
    return (
      <div className={className} ref='draftList'>
        <header>
          <div>{title}</div>
          <div>金额</div>
          <div>{titleRight}</div>
        </header>
        <ul>{listHtml}</ul>
        { noMore &&
          <div className='loadMore'>没有更多</div>
        }
      </div>
    )
  }
}

export default HomeDraft
