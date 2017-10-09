import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalInfo from '../ApprovalInfo'
import NoData from '@/components/NoData'
import './ApprovalList.scss'

import { fetchData } from '@/lib/base'

class ApprovalList extends Component {
  static propTypes = {
    pageEnd: PropTypes.bool,
    handlerScroll: PropTypes.func,
    list: PropTypes.array,
    tag: PropTypes.number,
    isBusy: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.scrolled = this.scrolled.bind(this)
    this.getApproveUrl = this.getApproveUrl.bind(this)
  }
  componentDidMount () {
    if (!this.props.pageEnd) {
      this.checkScroll(this.targetDiv)
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
    const { list, tag, pageEnd, isBusy } = this.props
    return (
      <div
        className='wm-approval-list'
        onScroll={!pageEnd && this.scrolled}
        ref={(e) => { this.targetDiv = e }}
      >
        { list.length
          ? list.map((data, i) => (
            <ApprovalInfo
              tag={tag}
              key={`${tag}-${data.expensesClaimsId}`}
              getApproveUrl={this.getApproveUrl}
              {...data}
            />
          ))
          : !isBusy && <NoData type='nodata' />
        }
        { list.length > 0
          ? isBusy && <NoData type='loading' size='small' />
          : isBusy && <NoData type='loading' /> }
        { !isBusy && pageEnd && list.length > 0 && <NoData type='loading' size='small' text='没有更多' /> }
      </div>
    )
  }
}

export default ApprovalList
