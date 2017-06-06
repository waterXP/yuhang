import React from 'react'
import { getDate } from '../../store/base'
import './ReceiptFlow.scss'

export const ReceiptFlow = (props) => {
  const annexes = [{
    id: 1,
    src: './imgs/test.jpeg'
  }, {
    id: 2,
    src: './imgs/test.jpeg'
  }]
  const flows = [{
    id: 1,
    src: './imgs/test.jpeg',
    name: '张先生',
    time: 133333333333,
    status: 1
  }, {
    id: 2,
    src: './imgs/test.jpeg',
    name: '张先生',
    time: 133333333333,
    status: 1
  }, {
    id: 3,
    src: './imgs/test.jpeg',
    name: '张先生',
    time: 133333333333,
    comment: '今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，今天天气很好，'
  }, {
    id: 4,
    src: './imgs/test.jpeg',
    name: '张先生',
    time: 133333333333,
    status: 0
  }, 
  ]
  return (
    <div className='wm-receipt-flow'>
      {annexes.length > 0 && <div className='annex-box'>
        <span className='annex'>附件</span>{annexes.map((data) => {
          return (
            <img key={data.id} src={data.src} />
          )
        })}
      </div>}
      {flows.map((data) => {
        return (
          <div className='flow clearfix' key={data.id}>
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
                <p>{data.name}<span className='pull-right wm-color-secondary'>{getDate(data.time, 'yyyy.MM.dd')}</span></p>
                {data.status !== undefined &&
                  <p className='wm-color-primary'>{data.status === 1
                    ? '已通过'
                    : '没通过'}</p>}
                {data.comment && <p className='comment'>{data.comment}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ReceiptFlow
