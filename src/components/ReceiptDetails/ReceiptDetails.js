import React from 'react'
import PropTypes from 'prop-types'
import { getCash } from '@/lib/base'
import './ReceiptDetails.scss'

export const ReceiptDetails = ({ data }) => {
  return (
    <div className='wm-receipt-details'>
      {data.map((v, i) => {
        return (<div key={v.id}>
          <p>{i + 1}&nbsp;{v.costTypeName}</p>
          <p>时间&nbsp;&nbsp;&nbsp;{v.eventTime}</p>
          <p>金额&nbsp;&nbsp;&nbsp;{getCash(v.money)}</p>
          <p>备注&nbsp;&nbsp;&nbsp;{v.remark}</p>
        </div>)
      })}
    </div>
  )
}

ReceiptDetails.propTypes = {
  data: PropTypes.array
}

export default ReceiptDetails
