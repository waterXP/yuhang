import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SendHistoryList from '@/components/SendHistoryList'
import './HomeHistory.scss'
import NoData from '@/components/NoData'
import ListTopic from '@/components/ListTopic'
import { goLocation } from '@/lib/base'
import { dingSetNavRight, dingSetTitle, datePicker } from '@/lib/ddApi'

class HomeHistory extends Component {
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
    setFilterTime: PropTypes.func
  }
  constructor () {
    super(...arguments)
    this.state = {
      text: '',
      hasScroll: false
    }
    this.setTopics = this::this.setTopics
    this.selDate = this::this.selDate
    this.checkScroll = this::this.checkScroll
  }

  componentDidMount () {
    this.getList()
    dingSetTitle('发放历史')
    dingSetNavRight('筛选', () => {
      this.selDate()
    }, true)
  }
  componentDidUpdate () {
    const { hasScroll } = this.state
    if (!hasScroll) {
      this.checkScroll()
    }
  }
  componentWillUnmount () {
    this.props.clearHistory()
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
      goLocation('home/history/filter')
    })
  }
  setTopics (topics) {
    if (topics) {
      this.topics = topics
    }
  }
  scrollHandler = (e) => {
    let cPage = this.props.cPage
    let pageCount = this.props.total_page
    let loadMore = this.props.loadMoreBool
    let scrollTop = e.target.scrollTop
    let height = this.refs.history.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight
    if (deviceHeight + scrollTop + 50 > height && !loadMore) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory('', cPage + 1, true)
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.props.getPaidHistory('', cPage + 1, false)
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
  checkScroll () {
    const el = this.refs.history
    if (el.clientHeight < el.scrollHeight) {
      this.setState({
        hasScroll: true
      })
    }
  }
  render () {
    const { paidHistory, loadingBool, loadMoreBool,
      total_page, cPage } = this.props
    const { text, hasScroll } = this.state
    let noData = false
    if (!paidHistory || paidHistory.length === 0) {
      noData = true
    }
    const pageEnd = total_page === cPage && cPage > 0
    return (
      <div
        className='wm-home-history'
        onScroll={this.scrollHandler}
        ref='history'
      >
      { text && <ListTopic text={ text } /> }
        { loadingBool
            ? <NoData type='loading' />
            : noData
              ? <NoData type='nodata' text='暂无数据' />
              : <SendHistoryList
                  datas={paidHistory}
                  pathname='detail'
                  setTopics={this.setTopics}
                />
        }
        { loadMoreBool && <NoData type='loading' size='small' /> }
        { hasScroll && pageEnd &&
          <div className='loadMore'>已经到底啦〜</div> }
      </div>
    )
  }
}

export default HomeHistory
