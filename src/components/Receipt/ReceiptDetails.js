import React from 'react'
import PropTypes from 'prop-types'
import { getCash } from '@/lib/base'

export const ReceiptDetails = ({ data, title }) => {
  return (
    <div className='wm-receipt-details'>
      { data.map((v, i) => {
        return (<div className='detail' key={v.id}>
          { title &&
            <p className='title'>{ title }{ i + 1 }</p>
          }
          <p className='flex'>
            <span className='span-name'>费用类型</span>
            <span className='span-content'>{v.costTypeName}</span>
          </p>
          <p className='flex'>
            <span className='span-name'>发生日期</span>
            <span className='span-content'>{v.eventTime}</span>
          </p>
          <p className='flex'>
            <span className='span-name'>金额</span>
            <span className='span-content'>{getCash(v.money)}</span>
          </p>
          <p className='flex'>
            <span className='span-name'>备注</span>
            <span className='span-content'>{v.remark}</span>
          </p>
        </div>)
      }) }
    </div>
  )
}

ReceiptDetails.propTypes = {
  data: PropTypes.array
}

export default ReceiptDetails
