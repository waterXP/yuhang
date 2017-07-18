import React, { Component } from 'react'
import HomeDraft from '@/components/HomeDraft'
import NoData from '@/components/NoData'
import './HomeReject.scss'
import { dingSetTitle } from '@/lib/base'

class HomeRejectList extends Component {
  constructor () {
    super()
    this.scrollHandler = this.scrollHandler.bind(this)
    this.getOffsetHeight = this.getOffsetHeight.bind(this)
  }
  render () {
    let { reject, loading, loadMoreBool } = this.props
    let noData = false
    if (!loading) {
      if (reject.data && reject.data.length !== 0) {
      } else {
        noData = true
      }
    }
    return (
      <div className='wm-reject-list' onScroll={this.scrollHandler}>
        {
          loading
            ? <NoData type='loading' />
            : noData
              ? <NoData type='nodata' />
              : <HomeDraft
                type={3}
                reject={reject}
                noMore={this.props.noMore}
                getOffsetHeight={this.getOffsetHeight}
              />
        }
        { loadMoreBool && <NoData type='loading' size='small' />}
      </div>
    )
  }
  componentWillMount () {
    this.props.getReject()
    this.props.initialReject()
    this.props.isLoading()
  }
  componentDidMount () {
    dingSetTitle('已拒绝')
  }
  getOffsetHeight (approveList) {
    let height = 0
    if (approveList) {
      height = approveList.offsetHeight
    }
    this.offsetHeight = height
  }
  scrollHandler (e) {
    let isLoading = this.props.loadMoreBool
    let { current_page, total_page } = this.props.draft.page

    let scrollTop = e.target.scrollTop
    let height = this.offsetHeight
    let deviceHeight = document.documentElement.clientHeight || document.body.clientHeight

    if (deviceHeight + scrollTop + 50 > height && !isLoading) {
      if (current_page + 1 === total_page) {
        this.props.loadMore()
        this.props.getReject(current_page + 1, true)
      } else if (current_page + 1 < total_page) {
        this.props.loadMore()
        this.props.getReject(current_page + 1, false)
      }
    }
  }
}

export default HomeRejectList
