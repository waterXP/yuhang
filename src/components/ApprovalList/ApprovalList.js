import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalInfo from '../ApprovalInfo'

class ApprovalList extends Component {
  render () {
    const { list, active } = this.props
    return (
      <div>
        { list.map((data, i) => (
            <ApprovalInfo key={ `${active}-${data.expensesClaimsId}` } { ...data } />
        )) }
      </div>
    )
  }
}

export default ApprovalList
