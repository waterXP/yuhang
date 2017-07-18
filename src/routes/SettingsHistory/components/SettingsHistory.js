import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SendHistoryList from '@/components/SendHistoryList'
import './SettingsHistory.scss'
import NoData from '@/components/NoData'
import { dingSetNavRight, goLocation, dingSetTitle } from '@/lib/base'

class SettingsHistory extends Component {
  static propTypes = {
    paidHistory: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.shape({
        actualMoney: PropTypes.number.isRequired,
        claimId: PropTypes.number.isRequired,
        paidDay: PropTypes.string.isRequired,
        paidMonth: PropTypes.string.isRequired,
        paidPerson: PropTypes.string.isRequired
      }).isRequired).isRequired
    ).isRequired,
    getPaidHistory: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired
  }

  componentDidMount () {
    const query = this.props.query
    if (query.year && query.month) {
      let str = query.year + '-'
      if (query.month < 9) {
        str += '0' + (+query.month + 1)
      } else {
        str += (+query.month + 1)
      }
      this.props.getPaidHistory(str)
      this.str = str
    } else {
      this.props.getPaidHistory()
    }
    dingSetTitle('发放历史')
    dingSetNavRight('筛选', () => {
      goLocation('/home/date/filter')
    }, true)
  }

  scrollHandler = (e) => {
    let cPage = this.props.cPage
    let pageCount = this.props.total_page
    let loadMore = this.props.loadMoreBool

    let scrollTop = e.target.scrollTop
    let height = this.refs.history.offsetHeight
    let deviceHeight = document.documentElement.clientHeight

    if (deviceHeight + scrollTop + 50 > height && !loadMore) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory(this.str, cPage + 1, true)
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory(this.str, cPage + 1, false)
      }
    }
  }

  render () {
    const { paidHistory } = this.props
    const paidMonths = []
    paidHistory.forEach((paids, index) => {
      if (paids[0]) {
        paidMonths.push(paids[0].paidMonth)
      } else {
        paidHistory.splice(index, 1)
      }
    })
    let { loadingBool, loadMoreBool } = this.props
    let noData = false
    if (paidHistory && paidHistory.length !== 0) {
      // has data
    } else {
      noData = true
    }

    return (
      <div className='wm-settings-history' onScroll={this.scrollHandler} ref='history'>
        { loadingBool
          ? <NoData type='loading' />
          : noData
          ? <NoData type='nodata' />
            : paidHistory.map((paids, index) => (
              <SendHistoryList
                key={paidMonths[index]}
                thead
                datas={paids}
                pathname='detail' />
            ))
        }
        { loadMoreBool && <NoData type='loading' size='small' /> }
      </div>
    )
  }
}

export default SettingsHistory

