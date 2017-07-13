import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalInfo from '../ApprovalInfo'
import NoData from '@/components/NoData'
import './ApprovalList.scss'

class ApprovalList extends Component {
  componentDidMount () {
    if (!this.props.pageEnd) {
      this.checkScroll(this.targetDiv)
    }
  }
  scrolled (e) {
    const { handleTouchEnd } = this.props
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
      <div className='wm-approval-list' onScroll={ !pageEnd && this.scrolled.bind(this) } ref={ (e) => { this.targetDiv = e } }>
        { list.length ?
            list.map((data, i) => (
              <ApprovalInfo key={ `${tag}-${data.expensesClaimsId}` } { ...data } />
            )) :
            !isBusy && <NoData type='nodata' />
        }
        { isBusy && <NoData type='loading' size='small' /> }
      </div>
    )
  }
}

export default ApprovalList