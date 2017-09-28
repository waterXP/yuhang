import React from 'react'
import PropTypes from 'prop-types'
import { getCash } from '@/lib/base'

export const ReceiptHistory = ({ data }) => {
  return (
    <div className='wm-receipt-history'>
      <p className='topic'>审批历史记录</p>
      { data.map((v, i) => {
        return (<div key={i}>
          <p className='title'>{ `${i + 1} ${v.clamNo}` }审批记录</p>
          <p className='content'>{v.history}</p>
        </div>)
      }) }
    </div>
  )
}

ReceiptHistory.propTypes = {
  data: PropTypes.array
}

export default ReceiptHistory
