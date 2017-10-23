import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeApproveList from '@/components/HomeApproveList'
import HomeNotPaid from '@/components/HomeNotPaid'
import HomeDraft from '@/components/HomeDraft'
import { dingSetTitle } from '@/lib/base'
import NoData from '@/components/NoData'
import ListTopic from '@/components/ListTopic'
import './HomeList.scss'

class HomeList extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      type: 0,
      text: ''
    }
    this.initial = this::this.initial
    this.scrollHandler = this::this.scrollHandler
    this.getOffsetHeight = this::this.getOffsetHeight
    this.deleteExp = this::this.deleteExp
  }
  componentWillMount () {
    this.initial()
  }
  componentDidMount () {
    const { type } = this.state
    switch (type) {
      case 1 :
        dingSetTitle('审批中')
        break
      case 2 :
        dingSetTitle('未发放')
        break
      case 4 :
        dingSetTitle('已撤回')
        break
      case 5 :
        dingSetTitle('已拒绝')
        break
      case 6 :
        dingSetTitle('草稿')
        break
      default :
        dingSetTitle('明快报销')
    }
  }
  componentWillUnmount () {
    this.props.initialApprove()
  }
  initial () {
    this.type = parseInt(this.props.location.query.type)
    const { initialApprove, getApproveList,
      getSumMoney, isLoading, location } = this.props
    const type = +location.query.type
    this.setState({ type })
    initialApprove()
    getApproveList(1, false, type)
    if (type === 1) {
      getSumMoney(1)
    } else if (type === 2) {
      getSumMoney(2)
    }
    isLoading()    
  }
  getOffsetHeight (approveList, topics) {
    let height = 0
    if (approveList) {
      height = approveList.offsetHeight
    }
    this.offsetHeight = height
    if (topics) {
      this.topics = topics
    }
  }
  scrollHandler (e) {
    let approve = this.props.approve
    let cPage = approve.approve.cPage
    let pageCount = approve.approve.pageCount
    let isLoading = approve.loadMore
    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if (deviceHeight + scrollTop + 50 > height && !isLoading) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getApproveList(cPage + 1, true, this.type)
        this.loadMore = true
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.loadMore = false
        this.props.getApproveList(cPage + 1, false, this.type)
      }
    }

    if (this.topics) {
      let text = ''
      if (scrollTop !== 0) {
        const { type } = this.state
        const offsetTop = (this.state.type < 3 ? 46 : 10) + scrollTop
        
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
  deleteExp (expensesClaimsId) {
    this.props.deleteExp(expensesClaimsId, 1, this.loadMore, this.type)
  }
  render () {
    const { approve, loading, loadMore,
      noMore, approveSumMoney } = this.props.approve
    const { corpId } = this.props
    const { type, text } = this.state
    let hasNoData = false
    if (!loading) {
      const approveList = approve ? approve.list : []
      if (!approveList || approveList.length === 0) {
        hasNoData = true
      }
    }
    let switchList = ''
    switch (type) {
      case 1 :
        switchList = <HomeApproveList
          approve={approve}
          getOffsetHeight={this.getOffsetHeight}
          noMore={noMore}
          approveSumMoney={approveSumMoney}
          type={type}
          corpId={corpId}
          handleInitial={this.initial}
        />
        break
      case 2 :
        switchList = <HomeNotPaid
          approve={approve}
          getOffsetHeight={this.getOffsetHeight}
          noMore={noMore}
          approveSumMoney={approveSumMoney}
          type={type} />
        break
      case 4 :
      case 5 :
      case 6 :
        switchList = <HomeDraft
          type={type}
          approve={approve}
          deleteExp={this.deleteExp}
          noMore={noMore}
          getOffsetHeight={this.getOffsetHeight} />
    }
    return (
      <div className='wm-approve-list' onScroll={this.scrollHandler}>
        { text && <ListTopic className={type < 3 ? 'has-sum' : ''} text={ text } /> }
        { loading
          ? <NoData type='loading' />
          : hasNoData
            ? <NoData type='nodata' text='暂无数据' />
            : switchList
        }
        {loadMore && <NoData type='loading' size='small' />}
      </div>
    )
  }
}
HomeList.propTypes = {
  approve:PropTypes.shape({
    approve:PropTypes.shape({
      cPage:PropTypes.number.isRequired,
      pageCount:PropTypes.number.isRequired
    }),
    loading:PropTypes.bool.isRequired,
    loadMore:PropTypes.bool.isRequired,
    noMore:PropTypes.bool.isRequired,
    approveSumMoney:PropTypes.number
  }).isRequired,
  deleteExp:PropTypes.func.isRequired,
  initialApprove:PropTypes.func.isRequired,
  getApproveList:PropTypes.func.isRequired,
  isLoading:PropTypes.func.isRequired,
  loadMore:PropTypes.func.isRequired,
  getSumMoney:PropTypes.func.isRequired,
  location:PropTypes.shape({
    query:PropTypes.shape({
      type:PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  corpId:PropTypes.string
}

export default HomeList
