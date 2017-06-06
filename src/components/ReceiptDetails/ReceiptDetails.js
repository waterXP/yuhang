import React from 'react'
import { getDate, getCash } from '../../store/base'
import './ReceiptDetails.scss'

export const ReceiptDetails = (props) => {
  const details = [{
    id: 33,
    name: '软件测试费',
    time: 1333333333,
    cash: 3434,
    memo: '今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，'
  }, {
    id: 34,
    name: '软件测试费',
    time: 1333333333,
    cash: 3434,
    memo: '今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，'
  }, {
    id: 35,
    name: '软件测试费',
    time: 1333333333,
    cash: 3434,
    memo: '今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，'
  }]
  return (
    <div className='wm-receipt-details'>
      {details.map((data, i) => {
        return (<div key={data.id}>
          <p>{i + 1}&nbsp;{data.name}</p>
          <p>时间&nbsp;&nbsp;&nbsp;{getDate(data.time, 'yyyy-MM-dd')}</p>
          <p>金额&nbsp;&nbsp;&nbsp;{getCash(data.cash)}</p>
          <p>备注&nbsp;&nbsp;&nbsp;{data.memo}</p>
        </div>)
      })}
    </div>
  )
}

export default ReceiptDetails
