import React from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'
import FormText from '../FormText'
import FormTextArea from '../FormTextArea'
import './ExpenseDetailInfo.scss'

export const ExpenseDetailInfo = ({ data, deleteHandler }) => {
  return (
    <div className='wm-expense-detail-info'>
      <button type='button' className='close-button' onClick={deleteHandler}>删除</button>
      <FormLink
        text='费用类型'
        name={`${data}.feeType`}
        value='请选择(必须)'
        iconRight='fa-angle-right' />
      <FormText
        text='金额'
        name={`${data}.cash`} />
      <FormLink
        text='发生日期'
        name={`${data}.startDate`}
        value='请选择(必须)'
        iconRight='fa-angle-right' />
      <FormTextArea
        name={`${data}.memo`}
        placeholder='备注：' />
    </div>
  )
}

export default ExpenseDetailInfo
