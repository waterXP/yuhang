import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SendHistoryList from '@/components/SendHistoryList'
import './HomeHistoryFilter.scss'
import NoData from '@/components/NoData'
import ListTopic from '@/components/ListTopic'
import { dingSetNavRight, goLocation, dingSetTitle,
  datePicker, getDate } from '@/lib/base'

class HomeHistoryFilter extends Component {
  static propTypes = {
    paidHistory: PropTypes.array.isRequired,
    getPaidHistory: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    total_page: PropTypes.number.isRequired,
    cPage: PropTypes.number.isRequired,
    loadMoreBool: PropTypes.bool.isRequired,
    loadingBool: PropTypes.bool.isRequired,
    isLoading: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired,
    setFilterTime: PropTypes.func,
    time: PropTypes.string
  }
  constructor () {
    super(...arguments)
    this.state = {
      text: ''      
    }
    this.setTopics = this::this.setTopics
    this.selDate = this::this.selDate
  }

  componentDidMount () {
    this.getList(this.props.time || getDate(+new Date(), 'yyyy-MM'))
    dingSetTitle('发放历史-筛选')
    dingSetNavRight('重新筛选', () => {
      this.selDate()
    }, true)
  }
  getList (v) {
    const { getPaidHistory, isLoading, clearHistory } = this.props
    getPaidHistory(v)
    isLoading()
    clearHistory()    
  }
  selDate () {
    const { setFilterTime } = this.props
    datePicker(+new Date(), (v) => {
      setFilterTime(v)
      this.getList(v)
    })
  }
  setTopics (topics) {
    if (topics) {
      this.topics = topics
    }
  }
  scrollHandler = (e) => {
    const { time } = this.props
    let cPage = this.props.cPage
    let pageCount = this.props.total_page
    let loadMore = this.props.loadMoreBool
    let height = this.refs.history.offsetHeight
    let scrollTop = e.target.scrollTop
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
    if (deviceHeight + scrollTop + 50 > height && !loadMore) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory(time, cPage + 1, true)
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory(time, cPage + 1, false)
      }
    }

    if (this.topics) {
      let text = ''
      if (scrollTop !== 0) {
        const offsetTop = 10 + scrollTop
        for (e of this.topics) {
          if (offsetTop > e.offsetTop) {
            text = e.innerText
          } else {
            break
          }
        }
      }
      this.setState({ text })
    }
  }
  componentWillUnmount () {
    this.props.clearHistory()
  }
  render () {
    const { paidHistory, loadingBool, loadMoreBool } = this.props
    const { text } = this.state
    let noData = false
    if (!paidHistory || paidHistory.length === 0) {
      noData = true
    }
    return (
      <div className='wm-settings-history-filter' onScroll={this.scrollHandler} ref='history'>
      { text && <ListTopic text={ text } /> }
        { loadingBool
            ? <NoData type='loading' />
            : noData
              ? <NoData type='nodata' text='暂无数据' />
              : <SendHistoryList
                  datas={paidHistory}
                  pathname='detail'
                  setTopics={this.setTopics} />
        }
        { loadMoreBool && <NoData type='loading' size='small' /> }
      </div>
    )
  }
}

export default HomeHistoryFilter
