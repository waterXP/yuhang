import React from 'react'
import { getDate, getCash } from '@/lib/base'
import './ReceiptDetails.scss'

export const ReceiptDetails = ({ data }) => {
  return (
    <div className='wm-receipt-details'>
      {data.map((v, i) => {
        return (<div key={i}>
          <p>{i + 1}&nbsp;{v.costTypeName}</p>
          <p>时间&nbsp;&nbsp;&nbsp;{v.eventTime}</p>
          <p>金额&nbsp;&nbsp;&nbsp;{getCash(v.money)}</p>
          <p>备注&nbsp;&nbsp;&nbsp;{v.remark}</p>
        </div>)
      })}
    </div>
  )
}

export default ReceiptDetails
