import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ApprovalInfo from '../ApprovalInfo'

class ApprovalList extends Component {
  render () {
    const { list, filter } = this.props
    return (
      <div>
        { list.map((data, i) => {
          if (data.type === filter) {
            return <ApprovalInfo key={ data.id } { ...data } />
          }
          return
        }) }
      </div>
    )
  }
}

export default ApprovalList
