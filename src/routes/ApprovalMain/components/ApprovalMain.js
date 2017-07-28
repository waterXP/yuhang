import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalNavs from '@/components/ApprovalNavs'
import ApprovalConditions from '@/components/ApprovalConditions'
import ApprovalList from '@/components/ApprovalList'
import './ApprovalMain.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

import { hashHistory } from 'react-router'

class ApprovalMain extends Component {
  static propTypes = {
    active: PropTypes.number.isRequired,
    updateActive: PropTypes.func.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      expensesClaimsId: PropTypes.number.isRequired,
      createdAvatar: PropTypes.string.isRequired,
      sumMoney: PropTypes.number.isRequired,
      createdBy: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      statusName: PropTypes.string.isRequired,
      submitTime: PropTypes.string
    }).isRequired).isRequired,
    page: PropTypes.shape({
      current_page: PropTypes.number,
      total_page: PropTypes.number
    }).isRequired,
    isBusy: PropTypes.bool.isRequired,
    inBusy: PropTypes.func.isRequired,
    getList: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.scrolled = this.scrolled.bind(this)
    this.updateActive = this.updateActive.bind(this)
  }

  componentDidMount () {
    const { updateActive, query } = this.props
    updateActive(+query.active || 1)
    dingSetTitle('明快报销')
    dingSetNavRight('')
  }
  scrolled (e) {
    const { inBusy, isBusy, page, active, getList } = this.props
    if (!isBusy) {
      inBusy(true)
      getList(active, { current_page: page.next_page })
    }
  }
  updateActive (active) {
    const { updateActive } = this.props
    hashHistory.replace({
      pathname: '/approval/main',
      query: { active }
    })
    updateActive(active)
  }

  render () {
    const { active, list, isBusy, page } = this.props
    let pageEnd = true
    if (page['current_page'] && page['total_page'] &&
      page['current_page'] < page['total_page']) {
      pageEnd = false
    }
    return (
      <div className='wm-approval-main'>
        <ApprovalNavs
          active={active}
          updateActive={this.updateActive}
        />
        <ApprovalConditions status={active} />
        <ApprovalList
          list={list}
          tag={active}
          handlerScroll={this.scrolled}
          pageEnd={pageEnd}
          isBusy={isBusy}
        />
      </div>
    )
  }
}

export default ApprovalMain
