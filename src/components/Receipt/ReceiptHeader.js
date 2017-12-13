import React from 'react'
import PropTypes from 'prop-types'
import { getCash } from '@/lib/base'
import { approveStatus } from '@/lib/enums'
import userImage from '@/assets/user.png'

export const ReceiptHeader = ({ data }) => {
  let className = ''
  switch (data.status) {
    case -2:
    case -1:
      className = ' color-error'
      break 
    case 0:
    case 1:
      className = ' color-warning'
      break
    case 2:
    case 3:
      className = ' color-error'
      break  
    case 4:
      className = ' color-correct'
      break
    case 5:
      className = ' color-warning'
      break
    case 6:
    case 7: 
    case 8:
      className = ' color-error'
      break
    case 9:
      className = ' color-correct'
  }
  return (
    <div className='wm-receipt-header clearfix'>
      <div>
        <div className='main-info'>
          <img className='avatar' src={data.createdAvatar || userImage} />
          <div className='base-info'>
            <p className='name'>{data.createName}</p>
            <p className={`type${className}`}>{approveStatus[data.status]}</p>
          </div>
        </div>
        <div className='receipt-info'>
          <p className='flex'>
            <span className='span-name'>总金额</span>
            <span className='span-content color-warning'>
              {getCash(data.summoney)}<i> 元</i>
            </span>
          </p>
          { data.projectName &&
            <p className='flex'>
              <span className='span-name'>项目名称</span>
              <span className='span-content'>
                {data.projectName}
              </span>
            </p>
          }
          <p className='flex'>
            <span className='span-name'>所在部门</span>
            <span className='span-content'>
              {data.deptName}
            </span>
          </p>
          <p className='flex'>
            <span className='span-name'>报销单号</span>
            <span className='span-content'>
              {data.expensesClaimNo}
            </span>
          </p>
          {
            data.createUserId !== data.userId && <p className='flex'>
              <span className='span-name'>报销人</span>
              <span className='span-content'>
                {data.userName && `${data.userName}（${data.deptName}）`}
              </span>
            </p>
          }
          {
            data.illustrate && <p className='flex'>
              <span className='span-name'>说明</span>
              <span className='span-content'>
                {data.illustrate}
              </span>
            </p>
          }
        </div>
      </div>
    </div>
  )
}

ReceiptHeader.propTypes = {
  data: PropTypes.object
}

export default ReceiptHeader
