import React from 'react'
import PropTypes from 'prop-types'
import './SendHistoryList.scss'
import { getDate, getCash, goLocation } from '@/lib/base'

export const SendHistoryList = ({ thead, datas, pathname }) => {
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
          <tr key={data.claimId} onClick={goLocation.bind(this, {
            pathname: 'settings/' + pathname,
            query: {
              id: data.claimId
            }
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

export default SendHistoryList