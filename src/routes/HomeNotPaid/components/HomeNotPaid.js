import React, { Component } from 'react'
import HomeNotPaid from '@/components/HomeNotPaid'
import NoData from '@/components/NoData'
import { dingSetTitle } from '@/lib/base'
import './HomeNotPaid.scss'

class HomeNotPaidList extends Component {
  constructor () {
    super()
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getOffsetHeight = this.getOffsetHeight.bind(this)
  }
  componentDidMount () {
    dingSetTitle('未发放')
  }
  render () {
    let notPaid = this.props.notPaid
    let { data, isLoading, loadMore } = notPaid
    let noData = false
    if (!isLoading) {
      if (data.list && data.list.length !== 0) {
      } else {
        noData = true
      }
    }
    return (
      <div className='wm-not-paid' onScroll={this.scrollHandler}>
        { isLoading
          ? <NoData type='loading' />
          : noData
            ? <NoData type='nodata' />
            : <HomeNotPaid notPaid={notPaid} getOffsetHeight={this.getOffsetHeight} />
        }
        {loadMore && <NoData type='loading' size='small' />}
      </div>
    )
  }
  getOffsetHeight (notPaid) {
    let height = 0
    if (notPaid) {
      height = notPaid.offsetHeight
    }
    this.offsetHeight = height
  }
  componentWillMount () {
    this.props.getNotPaid()
    this.props.getSumMoney()
    this.props.isLoading()
    this.props.initialNotPaid()
  }
  scrollHandler (e) {
    let cPage = this.props.notPaid.data.cPage
    let pageCount = this.props.notPaid.data.pageCount
    let isLoading = this.props.notPaid.loadMore

    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if (deviceHeight + scrollTop + 50 > height && !isLoading) {
      if (cPage + 1 === pageCount) {
        this.props.loadMore()
        this.props.getNotPaid(cPage + 1, true)
      } else if (cPage + 1 < pageCount) {
        this.props.loadMore()
        this.props.getNotPaid(cPage + 1, false)
      }
    }
  }
}

export default HomeNotPaidList
