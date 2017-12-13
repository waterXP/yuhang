import React from 'react'
import PropTypes from 'prop-types'
import { approveDetailType } from '@/lib/enums'
import userImage from '@/assets/user.png'

export const ReceiptFlow = ({ processList }) => {
  let className = [
    'color-secondary',
    'color-correct',
    'color-warning',
    'color-error'
  ]
  let pl = []
  processList.forEach((d) => {
    if (d.result) {
      pl.push(d)
    }
  })
  return (
    <div className='wm-receipt-flow'>
      {pl.map((data, i) => {
        return (
          <div className='flow clearfix' key={i}>
            <img className='avatar' src={data.avatar || userImage} />
            <div className='info'>
              <p className='base-info'>
                <span className='pull-left'>{data.userName || data.title}</span>
                {data.type !== undefined && data.type !== 3 &&
                  <span className={`pull-left ${className[data.color]}`}>
                    {
                      // approveDetailType[data.type]
                      data.result
                    }
                  </span>
                }
                {data.updateTime &&
                  <span className='update pull-right'>
                    {data.updateTime &&
                      data.updateTime.replace(/(\d){4}-/g, '')}
                  </span>
                }
                <span className='clearfix' />
              </p>
              {data.type !== 1 && data.type !== 13 &&
                data.remark && <p className='comment'>{data.remark}</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

ReceiptFlow.propTypes = {
  processList: PropTypes.array
}

export default ReceiptFlow
