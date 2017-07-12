import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalSearch.scss'

import SearchForm from '@/components/SearchForm'
import Cover from '@/components/Cover'
import ApprovalList from '@/components/ApprovalList'
import NoData from '@/components/NoData'

class ApprovalSearch extends Component {
  static propTypes = {
    active: PropTypes.number.isRequired,
    list: PropTypes.arrayOf(PropTypes.shape({
      expensesClaimsId: PropTypes.number.isRequired,
      createdAvatar: PropTypes.string.isRequired,
      sumMoney: PropTypes.number.isRequired,
      createdBy: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      statusName: PropTypes.string.isRequired,
      submitTime: PropTypes.string
    }).isRequired).isRequired,
    getList: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    inBusy: PropTypes.func.isRequired
  }

  getResult (value) {
    getList(active, {
      search: value,
      current_page: 1
    })
  }

  render () {
    const { inBusy, isBusy } = this.props
    return (
      <div className='wm-approval-search'>
        <SearchForm btnLink='/approval/main' inBusy={ inBusy } submitHandler={ this.getResult.bind(this) } />
        { isBusy ? <NoData type='loading' /> : <Cover /> }
      </div>
    )
  }
}

export default ApprovalSearch

