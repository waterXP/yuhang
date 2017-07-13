import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './ApprovalConditions.scss'

class ApprovalConditions extends Component {
  render () {
    const { status } = this.props
    return (
      <div className='wm-approval-conditions'>
        <Link to={{
          pathname: '/approval/search',
          query: { status }
        }}>
          <i className='fa fa-search' />
          &nbsp;搜索
        </Link>
        <Link to={{
          pathname: '/approval/filter',
          query: { status }
        }}>
          <i className='fa fa-filter' />
          &nbsp;筛选
        </Link>
      </div>
    )
  }
}

export default ApprovalConditions
