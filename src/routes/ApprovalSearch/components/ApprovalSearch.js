import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalSearch.scss'

import SearchForm from '@/components/SearchForm'
import Cover from '@/components/Cover'
import ApprovalList from '@/components/ApprovalList'
import NoData from '@/components/NoData'

class ApprovalSearch extends Component {
  static propTypes = {
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
    cleanList: PropTypes.func.isRequired,
    isBusy: PropTypes.bool.isRequired,
    inBusy: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      dirty: true
    }
  }

  componentDidMount () {
    this.props.cleanList()
  }

  getResult (value) {
    const { getList, inBusy, query } = this.props
    inBusy(true)
    getList(+query.status, {
      search: value,
      current_page: 1
    })
    this.setState({
      dirty: false
    })
  }

  render () {
    const { inBusy, isBusy, list, query } = this.props
    const { dirty } = this.state
    return (
      <div className='wm-approval-search'>
        <SearchForm btnLink='/approval/main' inBusy={ inBusy } submitHandler={ this.getResult.bind(this) } />
        { dirty ? <Cover /> :
            isBusy ? <NoData type='loading' /> :
              list.length ? <ApprovalList list={ list } tag={ +query.status || 1 } /> :
                <NoData type='nodata' />
        }
      </div>
    )
  }
}

export default ApprovalSearch

