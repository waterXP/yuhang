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
          <img className='avatar' src={data.createdAvatar || userImage} />
          <div className='base-info'>
            <p>{data.createName}</p>
            <p className='wm-color-secondary'>{approveStatus[data.status]}</p>
          </div>
        </div>
        <p>总金额：　<span className='wm-color-important'>{getCash(data.summoney)}</span>&nbsp;元</p>
        <p>报销单号：{highLightDate(data.expensesClaimNo)}</p>
        <p>报销人：　{data.userName && `${data.userName} / `}{data.deptName}</p>
      </div>
    </div>
  )
}

ReceiptHeader.propTypes = {
  data: PropTypes.object
}

export default ReceiptHeader
