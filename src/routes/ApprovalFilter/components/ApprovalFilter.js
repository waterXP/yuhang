import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalFilter.scss'
import Range from '@/components/Range'
import Filter from '@/components/Filter'
import FormButton from '@/components/FormButton'

class ApprovalFilter extends Component {
  static propTypes = {
    filter: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      sel: PropTypes.boolean
    }).isRequired).isRequired,
    billRange: PropTypes.arrayOf(PropTypes.shape({
      holder: PropTypes.string,
      value: PropTypes.string
    }).isRequired).isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateBillRange: PropTypes.func.isRequired
  }
  render () {
    const { filter, billRange, updateFilter, updateBillRange } = this.props
    return (
      <div className='wm-approval-filter'>
        <div className='filter'>
          <Range title='输入金额区间' range={ billRange } dec={ 2 } updateRange={ updateBillRange } />
          <Filter
            title='选择筛选条件'
            conditions={ filter }
            multiple={ true }
            clickHandler={ updateFilter }
          />
        </div>
        <FormButton text='确认' />
      </div>
    )
  }
}

export default ApprovalFilter

