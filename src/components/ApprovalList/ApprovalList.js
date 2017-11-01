import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalInfo from '../ApprovalInfo'
import ApprovalSearchInfo from '../ApprovalSearchInfo'
import NoData from '@/components/NoData'
import './ApprovalList.scss'

import { fetchData } from '@/lib/base'

class ApprovalList extends Component {
  static propTypes = {
    pageEnd: PropTypes.bool,
    handlerScroll: PropTypes.func,
    list: PropTypes.array,
    tag: PropTypes.number,
    isBusy: PropTypes.bool,
    inSearch: PropTypes.bool,
    keyword: PropTypes.string,
    loaded: PropTypes.bool
  }
  constructor () {
    super(...arguments)
    this.scrolled = this::this.scrolled
    this.getApproveUrl = this::this.getApproveUrl
    this.checkHasMore = this::this.checkHasMore
    this.state = {
      hasMore: false
    }
  }
  componentDidMount () {
    if (!this.props.pageEnd) {
      this.checkScroll(this.targetDiv)
    }
    this.checkHasMore()
  }
  componentDidUpdate () {
    this.checkHasMore()
  }
  checkHasMore () {
    const hasMore = this.targetDiv
      ? this.targetDiv.clientHeight < this.targetDiv.scrollHeight
      : false
    if (hasMore) {
      if (!this.state.hasMore) {
        this.setState({
          hasMore
        })
      }
    } else {
      if (this.state.hasMore) {
        this.setState({
          hasMore
        })
      }
    }
  }
  getApproveUrl (expensesClaimsId, cb) {
    fetchData('get /expensesClaimsView/getDingApproveUrl.json', {
      expensesClaimsId
    })
    .then((d) => {
      if (!d.result) {
        cb(d.data)
      }
    })
  }
  scrolled (e) {
    this.checkScroll(e.target)
  }
  checkScroll (target) {
    const { clientHeight, scrollTop, scrollHeight } = target
    if (clientHeight + scrollTop > scrollHeight - 100) {
      this.props.handlerScroll()
    }
  }
  render () {
    const { list, tag, pageEnd, isBusy, inSearch,
      keyword, handleInitial, loaded } = this.props
    const { hasMore } = this.state
    return (
      <div
        className='wm-approval-list'
        onScroll={!pageEnd && this.scrolled}
        ref={(e) => { this.targetDiv = e }}
      >
        { list.length
          ? list.map((data, i) => (
            inSearch
            ? <ApprovalSearchInfo
              tag={tag}
              key={`${tag}-${data.expensesClaimsId}`}
              getApproveUrl={this.getApproveUrl}
              keyword={keyword}
              {...data}
              handleInitial={handleInitial}
            />
            : <ApprovalInfo
              tag={tag}
              key={`${tag}-${data.expensesClaimsId}`}
              getApproveUrl={this.getApproveUrl}
              handleInitial={handleInitial}
              {...data}
            />
          ))
          : !isBusy && loaded && <NoData type='nodata' />
        }
        { list.length > 0
          ? isBusy && <NoData type='loading' size='small' />
          : isBusy && <NoData type='loading' /> }
        {
          !isBusy && pageEnd && hasMore &&
          list.length > 0 && <NoData type='loading' size='small' text='已经到底啦〜' noImg />
        }
      </div>
    )
  }
}

export default ApprovalList
