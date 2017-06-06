import React from 'react'
import { getCash } from '../../store/base'
import './ReceiptHeader.scss'

export const ReceiptHeader = (props) => {
  const info = {
    name: '张三君',
    status: 1,
    cash: 500,
    code: 'btx201401012233',
    author: '李四好'
  }
  return (
    <div className='wm-receipt-header clearfix'>
      <div>
        <div className='main-info'>
          <img className='avatar' src='./imgs/test.jpeg' />
          <div className='base-info'>
            <p>{info.name}</p>
            <p className='wm-color-secondary'>{info.status ? '已完成' : '未完成'}</p>
          </div>
        </div>
        <p>总金额&nbsp;<span className='wm-color-important'>{getCash(info.cash)}</span>&nbsp;元</p>
      </div>
      <p>{info.code}<span className='wm-color-primary'>{info.author}</span>制单</p>
    </div>
  )
}

export default ReceiptHeader
