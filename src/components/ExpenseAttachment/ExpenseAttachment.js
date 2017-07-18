import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseAttachment.scss'

export const ExpenseAttachment = ({ attachmentList = [], addAttachment, removeAttachment, showImg, restAttachments = [] }) => {
  return (
    <div className='wm-expense-attachment'>
      <p>附件</p>
      <div className='list'>
        { attachmentList.length + restAttachments.length < 9 && <button onClick={ addAttachment.bind(this) }><i className='fa fa-plus' /></button> }
        { restAttachments.map((v, i) => 
          <div className='img' key={ `${i}-${v.url}` }>
            <i className='fa fa-times' onClick={ removeAttachment.bind(this, i, 'restAttachments') } />
            <img src={ v.url } onClick={ showImg.bind(this, v.url) } />
          </div>
        )}
        { attachmentList.map((v, i) =>
          <div className='img' key={ `${i + restAttachments.length}-${v}` }>
            <i className='fa fa-times' onClick={ removeAttachment.bind(this, i, 'attachmentList') } />
            <img src={ v } onClick={ showImg.bind(this, v) } />
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseAttachment
