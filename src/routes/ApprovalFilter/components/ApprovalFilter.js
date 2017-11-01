import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalFilter.scss'
import Range from '@/components/Range'
import Filter from '@/components/Filter'
import FormButton from '@/components/FormButton'
import ApprovalList from '@/components/ApprovalList'
import { approveStatus } from '@/lib/enums'
import { getObjArray, goLocation } from '@/lib/base'
import { dingSetTitle, dingSetMenu } from '@/lib/ddApi'

class ApprovalFilter extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    filter: PropTypes.array,
    range: PropTypes.array,
    setFilter: PropTypes.func,
    cleanList: PropTypes.func
  }
  constructor () {
    super(...arguments)
    const status = +this.props.query.status
    const { range } = this.props
    let filter = [...this.props.filter]
    if (filter.length === 0) {
      switch (status) {
        case 3:
          filter = getObjArray(approveStatus, 'id', 'text')
          .filter((v) => +v.id === -1 || +v.id > 4)
          break
        case 4:
          filter = getObjArray(approveStatus, 'id', 'text')
          .filter((v) => +v.id === -1 || +v.id > 0)
          break
        default:
          filter = getObjArray(approveStatus, 'id', 'text')
          .filter((v) => +v.id !== 0 )
      }
    }
    this.state = {
      filter,
      range,
      showResult: false
    }

    this.toggleFilter = this::this.toggleFilter
    this.updateRange = this::this.updateRange
    this.cancel = this::this.cancel
    this.handleClick = this::this.handleClick
  }
  componentDidMount () {
    let { status } = this.props.query
    status = +status
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
  }
  cancel () {
    window.history.back()
  }
  handleClick () {
    const { query, setFilter, cleanList } = this.props
    const { range, filter } = this.state
    cleanList()
    setFilter(filter, range)
    goLocation({
      pathname: '/approval/filter/results',
      query: {
        status: +query.status || 1
      }
    })
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
    this.setState({ range })
  }
  render () {
    const { query } = this.props
    const { showResult, range, filter } = this.state
    const status = +query.status || 1
    const rangeAttr = {
      title: '报销金额区间（元）',
      range,
      dec: 2,
      updateRange: this.updateRange,
      placeholder: ['最小值', '最大值']
    }
    return (
      <div className='wm-approval-filter'>
        <div className='filter'>
          <Range {...rangeAttr} />
          { status !== 1 && <Filter
            title='报销状态选择'
            conditions={filter}
            multiple
            clickHandler={this.toggleFilter}
          /> }
        </div>
        <FormButton text='确认' onClick={this.handleClick} />
      </div>
    )
  }
}

export default ApprovalFilter
