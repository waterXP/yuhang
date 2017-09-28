import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalNavs from '@/components/ApprovalNavs'
import ApprovalList from '@/components/ApprovalList'
import './ApprovalMain.scss'
import { dingSetTitle, dingSetMenu, toast, goLocation } from '@/lib/base'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'
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
    query: PropTypes.object.isRequired,
    cleanFilter: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.scrolled = this::this.scrolled
    this.updateActive = this::this.updateActive
    this.setConditions = this::this.setConditions
    this.devClicks = this::this.devClicks
  }

  componentDidMount () {
    const { updateActive, query } = this.props
    updateActive(+query.active || 1)
    dingSetTitle('明快报销')
    dingSetMenu(
      [{
        id: 'search',
        text: '搜索'
      }, {
        id: 'filter',
        text: '筛选'
      }],
      this.setConditions
    )
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
  setConditions (d) {
    const { cleanFilter, active } = this.props
    cleanFilter()
    goLocation({
      pathname: `/approval/${d.id}`,
      query: {
        status: active
      }
    })
  }
  devClicks (id) {
    this.setConditions({ id: id === 0 ? 'search' : 'filter' })
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
        { isDev && <DevButtons titles={['搜索', '筛选']} handleClick={this.devClicks} />}
        <ApprovalNavs
          active={active}
          updateActive={this.updateActive}
        />
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
