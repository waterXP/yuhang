import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SendHistoryList.scss'
import { getCash, goLocation } from '@/lib/base'

class SendHistoryList extends Component {
  static propTypes = {
    thead: PropTypes.bool,
    datas: PropTypes.array,
    pathname: PropTypes.string.isRequired
  }
  gotoLocation (location) {
    return () => goLocation(location)
  }

  render () {
    const { thead, datas, pathname } = this.props
    return (
      <table className='wm-send-history-list'>
        {thead && <thead>
          <tr>
            <th>日期</th>
            <th>金额</th>
            <th>发放人</th>
          </tr>
        </thead>}
        <tbody>
          {datas.map((data) => (
            <tr key={data.claimId} onClick={this.gotoLocation({
              pathname: 'home/' + pathname,
              query: { id: data.claimId }
            })}>
              <td>{data.paidDay}</td>
              <td>{getCash(data.actualMoney)}</td>
              <td>{data.paidPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default SendHistoryList
