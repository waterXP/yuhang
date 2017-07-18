import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeApproveList from '@/components/HomeApproveList'
import { dingSetTitle } from '@/lib/base'
import NoData from '@/components/NoData'
import './HomeApprove.scss'

class HomeApprove extends Component {
  constructor () {
    super()
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getOffsetHeight = this.getOffsetHeight.bind(this)
  }
  componentDidMount () {
    dingSetTitle('审批中')
  }
  getOffsetHeight (approveList) {
    let height = 0
    if (approveList) {
      height = approveList.offsetHeight
    }
    this.offsetHeight = height
  }
  componentWillMount () {
    this.props.initialApprove()
    this.props.getApproveList()
    this.props.getSumMoney()
    this.props.isLoading()
  }
  scrollHandler (e) {
    let cPage = this.props.approve.approve.cPage
    let pageCount = this.props.approve.approve.pageCount
    let isLoading = this.props.approve.loadMore

    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if (deviceHeight + scrollTop + 50 > height && !isLoading) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getApproveList(cPage + 1, true)
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.props.getApproveList(cPage + 1, false)
      }
    }
  }
  render () {
    let { approve } = this.props
    let { loading, loadMore } = approve
    let hasNoData = false
    if (!loading) {
      let subApprove = approve.approve
      if (subApprove && subApprove.list && subApprove.list.length !== 0) {
        // 存在数据
      } else {
        // 不存在数据
        hasNoData = true
      }
    }

    return (
      <div className='wm-approve-list' onScroll={this.scrollHandler}>
        { loading
            ? <NoData type='loading' />
            : hasNoData
              ? <NoData type='nodata' />
              : <HomeApproveList
                approve={approve}
                getOffsetHeight={this.getOffsetHeight}
              />
        }
        { loadMore && <NoData type='loading' size='small' /> }
      </div>
    )
  }
}
HomeApprove.propTypes = {
  approve:PropTypes.shape({
    approve:PropTypes.object.isRequired,
    loading:PropTypes.bool.isRequired,
    loadMore:PropTypes.bool.isRequired,
    noMore:PropTypes.bool.isRequired,
    approveSumMoney:PropTypes.number.isRequired
  }).isRequired
}

export default HomeApprove
