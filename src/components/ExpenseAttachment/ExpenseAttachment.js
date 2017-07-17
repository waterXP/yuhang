import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseAttachment.scss'

export const ExpenseAttachment = ({ attachmentList = [], addAttachment, removeAttachment }) => {
  return (
    <div className='wm-expense-attachment'>
      <p>附件</p>
      <div className='list'>
        { attachmentList.length < 9 && <button onClick={ addAttachment.bind(this) }><i className='fa fa-plus' /></button> }
        { attachmentList.map((v, i) =>
          <div className='img' key={ `${i}-${v}` }>
            <i className='fa fa-times' onClick={ removeAttachment.bind(this, i) } />
            <img src={ v } />
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseAttachment
