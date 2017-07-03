import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Receipt from '@/components/Receipt'

class SettingsHistoryDetail extends Component {
  static propTypes = {
   getHistoryDetail: PropTypes.func.isRequired,
   historyDetail: PropTypes.object.isRequired,
   query: PropTypes.object.isRequired
  }

  componentDidMount () {
    if (this.props.query.id) {
      this.props.getHistoryDetail(this.props.query.id)
    }
  }

  render () {
    const { historyDetail, query, addComment } = this.props
    return (
      <div>{historyDetail.master
        && (+query.id === historyDetail.master.expensesClaimId)
        && <Receipt data={historyDetail} addComment={addComment} />}</div>
    )
  }
}

export default SettingsHistoryDetail

