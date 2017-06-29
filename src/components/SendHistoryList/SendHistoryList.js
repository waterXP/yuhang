import React from 'react'
import PropTypes from 'prop-types'
import './SendHistoryList.scss'
import { getDate, getCash, goLocation } from '../../lib/base'

export const SendHistoryList = (props) => {
  return (
    <table className='wm-send-history-list'>
      {props.thead && <thead>
        <tr>
         <th>日期</th>
         <th>金额</th>
         <th>发放人</th>
        </tr>
      </thead>}
      <tbody>
        {props.datas.map((data) => (
          <tr key={data.claimId} onClick={goLocation.bind(this, {
            pathname: 'settings/' + props.pathname,
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