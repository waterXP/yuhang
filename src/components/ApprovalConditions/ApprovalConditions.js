import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import './ApprovalConditions.scss'

class ApprovalConditions extends Component {
  render () {
    return (
      <div className='wm-approval-conditions'>
        <Link to='/approval/search'>
          <i className='fa fa-search'></i>
          &nbsp;搜索
        </Link>
        <Link to='/approval/filter'>
          <i className='fa fa-filter'></i>
          &nbsp;筛选
        </Link>
      </div>
    )
  }
}

export default ApprovalConditions
