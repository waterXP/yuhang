import React from 'react'
import { getDate } from '../../lib/base'
import './ReceiptFlow.scss'

export const ReceiptFlow = (props) => {
  const { processList, attachmentList } = props
  return (
    <div className='wm-receipt-flow'>
      {attachmentList.length > 0 && <div className='attachment-box'>
        <span className='attachment'>附件</span>{attachmentList.map((data) => {
          return (
            <img key={data.id} src={data.url} />
          )
        })}
      </div>}
      {processList.map((data, i) => {
        return (
          <div className='flow clearfix' key={i}>
            <span className={
              data.status !== undefined
              ? data.status === 1
                ? 'fa fa-check-circle wm-color-correct'
                : 'fa fa-times-circle wm-color-error'
              : 'fa fa-info-circle wm-color-primary'
            }></span>
            <div className='detail'>
              <img className='avatar' src={data.src} />
              <div className='info'>
                <p>{data.userName}<span className='pull-right wm-color-secondary'>{getDate(new Date(data.updateTime), 'yyyy.MM.dd')}</span></p>
                {data.status !== undefined &&
                  <p className='wm-color-primary'>{data.status === 1
                    ? '已通过'
                    : '没通过'}</p>}
                {data.remark && <p className='comment'>{data.remark}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReceiptFlow
