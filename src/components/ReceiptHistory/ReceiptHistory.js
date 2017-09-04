import React from 'react'
import PropTypes from 'prop-types'
import { getCash } from '@/lib/base'
import './ReceiptHistory.scss'

export const ReceiptHistory = ({ data, title }) => {
  return (
    <div className='wm-receipt-history'>
      { title &&
        <p>
          <span className='fa fa-info-circle wm-color-important' />
          &nbsp;{ title }
        </p>
      }
      { data.map((v, i) => {
        return (<div key={i}>
          <p>{ `${i + 1} ${v.clamNo}` }审批记录</p>
          <p>{v.history}</p>
        </div>)
      }) }
    </div>
  )
}

ReceiptHistory.propTypes = {
  data: PropTypes.array
}

export default ReceiptHistory
