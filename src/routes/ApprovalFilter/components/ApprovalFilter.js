import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalFilter.scss'
import Range from '@/components/Range'
import Filter from '@/components/Filter'
import FormButton from '@/components/FormButton'
import ApprovalList from '@/components/ApprovalList'
import NoData from '@/components/NoData'
import { approveStatus } from '@/lib/enums'
import { getObjArray } from '@/lib/base'

class ApprovalFilter extends Component {
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
    isBusy: PropTypes.bool.isRequired,
    getList: PropTypes.func.isRequired,
    inBusy: PropTypes.func.isRequired,
    cleanList: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      filter: getObjArray(approveStatus, 'id', 'text'),
      range: ['', ''],
      showResult: false
    }
  }
  toggleResult (value) {
    this.setState({
      showResult: value
    })
    if (value) {
      const { query, inBusy, getList } = this.props
      const { range, filter } = this.state
      const status = +query.status || 1
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
      params.current_page = 1
      inBusy(true)
      getList(status, params)
    } else {
      const { cleanList } = this.props
      cleanList()
    }
  }
  scrolled (e) {
    const { inBusy, isBusy, page, query, getList } = this.props
      const status = +query.status || 1
    if (!isBusy) {
      inBusy(true)
      getList(status, { current_page: page.next_page })
    }
  }
  toggleFilter (targetId) {
    this.setState((prevState, props) => {
      let filter = [...prevState.filter]
      let target = filter.find((v) => v.id === targetId)
      target.sel = !target.sel
      return { filter }
    })
  }
  updateRange (range) {
    this.setState({
      range
    })
  }
  render () {
    const { isBusy, list, query, page } = this.props
    const { showResult, range, filter } = this.state
    const status = +query.status || 1
    let pageEnd = true
    if (page.current_page && page.total_page && page.current_page < page.total_page) {
      pageEnd = false
    }
    const rangeAttr = {
      title: '输入金额区间',
      range,
      dec: 2,
      updateRange: this.updateRange.bind(this),
      placeholder: ['最小值', '最大值']
    }
    let result
    if (showResult) {
      result = (
        <div className='wm-approval-filter'>
          <input
            className='top-btn'
            type='button'
            value='变更筛选条件'
            onClick={ this.toggleResult.bind(this, false) }
          />
          <ApprovalList
            list={ list }
            tag={ status }
            handlerScroll={ this.scrolled.bind(this) }
            pageEnd={ pageEnd }
            isBusy={ isBusy }
          />
        </div>
      )
    } else {
      result = (
        <div className='wm-approval-filter padding'>
          <div className='filter'>
            <Range {...rangeAttr} />
            { status !== 1 && <Filter
              title='选择筛选条件'
              conditions={ filter }
              multiple={ true }
              clickHandler={ this.toggleFilter.bind(this) }
            /> }
          </div>
          <FormButton text='确认' onClick={ this.toggleResult.bind(this, true) } />
        </div>
      )
    }
    return result
  }
}

export default ApprovalFilter
