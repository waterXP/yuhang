import React from 'react'
import PropTypes from 'prop-types'
import './SendHistoryList.scss'
import { getDate, getCash, goLocation } from '../../store/base'

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
          <tr key={data.id} onClick={goLocation.bind(this, {
            pathname: 'settings/' + props.pathname,
            query: {
              id: data.id
            }
          })}>
            <td>{getDate(data.date, 'MM-dd')}</td>
            <td>{getCash(data.cash)}</td>
            <td>{data.agent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SendHistoryList