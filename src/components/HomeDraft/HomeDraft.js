import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './HomeDraft.scss'
import HomeDraftCell from './HomeDraftCell'
import HomeRejectCell from './HomeRejectCell'

class HomeDraft extends Component {
  constructor () {
    super(...arguments)
    this.deleteExp = this::this.deleteExp
  }

  componentDidMount () {
    this.props.getOffsetHeight(this.refs.approveList, this.topics)
  }
  componentDidUpdate () {
    this.props.getOffsetHeight(this.refs.approveList, this.topics)
  }
  deleteExp (expensesClaimsId) {
    this.props.deleteExp(expensesClaimsId)
  }

  render () {
    const { type, approve, hasScroll } = this.props
    const _this = this
    let lists = []
    let currentMonth = ''
    let topics = []
    const { cPage, pageCount } = approve
    this.topics = topics
    if (approve && approve.list) {
      if (type === 5) {
        approve.list.map((v, i) => {
          const month = v.updatedAt.substr(0, 7)
          if (currentMonth !== month) {
            currentMonth = month
            lists.push(
              <li className='list-topic' key={month + '_' + i} ref={(e) => { topics.push(e) }}>
                <span>{month}</span>
              </li>
            )
          }
          lists.push(
            <HomeRejectCell
              key={v.expensesClaimsId}
              undoCell={v}
              type={type} />
          )
        })
      } else {
        approve.list.map((v, i) => {
          const dt = type === 4 ? v.submitTime : v.updatedAt
          const month = dt.substr(0, 7)
          if (currentMonth !== month) {
            currentMonth = month
            lists.push(
              <li className='list-topic' key={month + '_' + i} ref={(e) => { topics.push(e) }}>
                <span>{month}</span>
              </li>
            )
          }
          lists.push(
            <HomeDraftCell
              key={v.expensesClaimsId}
              draftCell={v}
              type={type}
              deleteExp={_this.deleteExp} />
          )
        })
      }
    }
    return (
      <div className='wm-home-draft' ref='approveList'>
        <ul>{ lists }</ul>
        { cPage === pageCount && hasScroll &&
          <div className='loadMore'>已经到底啦〜</div>
        }
      </div>
    )
  }
}

HomeDraft.propTypes = {
  type:PropTypes.number.isRequired,
  approve:PropTypes.object,
  deleteExp:PropTypes.func,
  getOffsetHeight:PropTypes.func.isRequired,
  hasScroll: PropTypes.bool
}

export default HomeDraft
