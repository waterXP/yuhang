import React from 'react'
import PropTypes from 'prop-types'
import { getCash, highLightDate } from '@/lib/base'
import { approveStatus } from '@/lib/enums'
import userImage from '@/assets/user.png'
import './ReceiptHeader.scss'

export const ReceiptHeader = ({ data }) => {
  return (
    <div className='wm-receipt-header clearfix'>
      <div>
        <div className='main-info'>
          <img className='avatar' src={data.avatar || data.createdAvatar || userImage} />
          <div className='base-info'>
            <p>{data.userName}</p>
            <p className='wm-color-secondary'>{approveStatus[data.status]}</p>
          </div>
        </div>
        <p>总金额&nbsp;<span className='wm-color-important'>{getCash(data.summoney)}</span>&nbsp;元</p>
      </div>
      <p>{highLightDate(data.expensesClaimNo)}&nbsp;由<span className='wm-color-primary'>{data.createName}</span>制单</p>
    </div>
  )
}

ReceiptHeader.propTypes = {
  data: PropTypes.object
}

export default ReceiptHeader
