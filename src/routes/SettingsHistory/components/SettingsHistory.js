import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SendHistoryList from '../../../components/SendHistoryList'
import './SettingsHistory.scss'

class SettingsHistory extends Component {
  static propTypes = {
    paidHistory: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.shape({
        actualMoney: PropTypes.number.isRequired,
        claimId: PropTypes.number.isRequired,
        paidDay: PropTypes.string.isRequired,
        paidMonth: PropTypes.string.isRequired,
        paidPerson: PropTypes.string.isRequired
       }).isRequired
      ).isRequired
    ).isRequired,
   getPaidHistory: PropTypes.func.isRequired,
   query: PropTypes.object.isRequired
  }

  componentDidMount () {
    const query = this.props.query
    if (query.year && query.month) {
      let str = query.year + '-'
      if (query.month < 9) {
        str += '0' + (+query.month + 1)
      } else {
        str += (+query.month + 1)
      }
      this.props.getPaidHistory(str)
    }    
    this.props.getPaidHistory()
  }

  render () {
    const paidHistory = this.props.paidHistory
    const paidMonths = []
    paidHistory.forEach((paids, index) => {
      if (paids[0]) {
        paidMonths.push(paids[0].paidMonth)
      } else {
        paidHistory.splice(index, 1)
      }
    })
    return (
      <div className='wm-settings-history'>
        {paidHistory.map((paids, index) => (
          <SendHistoryList
            key={paidMonths[index]}
            thead={true}
            datas={paids}
            pathname='histroy/detail' />
        ))}
      </div>
    )
  }
}

export default SettingsHistory

