import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalFilterResults.scss'
import ApprovalList from '@/components/ApprovalList'
import { approveStatus } from '@/lib/enums'
import { goBack } from '@/lib/base'
import { dingSetTitle, dingSetMenu } from '@/lib/ddApi'

class ApprovalFilterResults extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
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
    getList: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    inBusy: PropTypes.func.isRequired,
    filter: PropTypes.array,
    range: PropTypes.array
  }
  constructor () {
    super(...arguments)
    this.scrolled = this::this.scrolled
    this.cancel = this::this.cancel
    this.getResults = this::this.getResults
  }
  componentDidMount () {
    const status = +this.props.query.status
    switch (status) {
      case 1 :
        dingSetTitle('待我审批')
        break
      case 2:
        dingSetTitle('我发起的')
        break
      case 3:
        dingSetTitle('抄送我的')
        break
      case 4:
        dingSetTitle('我已审批')
        break
      default:
        dingSetTitle('明快报销')
    }
    dingSetMenu(
      [{
        id: 'cancel',
        text: '取消'
      }],
      this.cancel
    )
    this.getResults(1)
  }
  getResults (p) {
    const { inBusy, query, getList, range, filter } = this.props
    const status = +query.status || 1
    inBusy(true)
    let params = {}
    if (range[0] !== '' && !isNaN(+range[0])) {
      params.summoneyMin = +range[0]
    }
    if (range[1] !== '' && !isNaN(+range[1])) {
      params.summoneyMax = +range[1]
    }
    if (status !== 1) {
      let temp = []
      filter.forEach((v) => {
        if (v.sel) {
          temp.push(v.id)
        }
      })
      if (temp.length > 0) {
        params.status = temp.join(',')
      }
    }
    params.current_page = p
    inBusy(true)
    getList(status, params)
  }
  scrolled (e) {
    const { page, isBusy } = this.props
    if (!isBusy) {
      this.getResults(page.next_page)
    }
  }
  cancel () {
    goBack()
  }
  render () {
    const { isBusy, list, query, page } = this.props
    const status = +query.status || 1
    let pageEnd = true
    if (page.current_page && page.total_page &&
      page.current_page < page.total_page) {
      pageEnd = false
    }
    return (
      <div className='wm-approval-filter-results'>
        <ApprovalList
          list={list}
          tag={status}
          handlerScroll={this.scrolled}
          pageEnd={pageEnd}
          isBusy={isBusy}
          loaded
        />
      </div>
    )
  }
}

export default ApprovalFilterResults
