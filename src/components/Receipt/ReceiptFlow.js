import React from 'react'
import PropTypes from 'prop-types'
import { approveDetailType } from '@/lib/enums'
import userImage from '@/assets/user.png'

export const ReceiptFlow = ({ processList }) => {
  let className = [
    'color-secondary',
    'color-error',
    'color-error',
    'color-secondary',
    'color-correct',
    'color-warning',
    'color-warning',
    'color-correct',
    'color-error',
    'color-correct',
    'color-warning',
    'color-warning',
    'color-warning'
  ]
  className[-2] = 'color-secondary'
  className[-1] = 'color-error'
  return (
    <div className='wm-receipt-flow'>
      {processList.map((data, i) => {
        return (
          <div className='flow clearfix' key={i}>
            <img className='avatar' src={data.avatar || userImage} />
            <div className='info'>
              <p className='base-info'>
                <span className='pull-left'>{data.userName}</span>
                {data.type !== undefined &&
                  <span className={`pull-left ${className[data.type]}`}
                  >
                    {approveDetailType[data.type]}
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
              {data.remark && <p className='comment'>{data.remark}</p>}
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
