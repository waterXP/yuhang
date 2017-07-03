import React from 'react'
import PropTypes from 'prop-types'
import FormSelect from '../FormSelect'
import { getCash } from '@/lib/base'
import './ExpenseAccountInfo.scss'

export const ExpenseAccountInfo = ({ totalCash, newAccount }) => {
  return (
    <div className='wm-expense-account-info'>
      <label className='wm-color-secondary'>
        报销总金额：<span className='wm-color-important'>
         {getCash(totalCash)}元
        </span>
      </label>
      <FormSelect
        text='收款账号'
        name='account'
        defaultValue={{type: 'text', text: '请选择(必须)'}}
        options={{
          '1': {
            type: 'text',
            text: '招商银行 易亚洲 尾号：5000'
          }, '2': {
            type: 'text',
            text: '空：无需付款'
          }
        }}
        changeHandler={newAccount}
        iconRight='fa-angle-right' />
      <FormSelect
        text='项目'
        name='subject'
        defaultValue={{type: 'text', text: '请选择(必须)'}}
        options={{
          '1': {
            type: 'text',
            text: '年会'
          }, '2': {
            type: 'text',
            text: '三板斧培训'
          }
        }}
        iconRight='fa-angle-right' />
    </div>
  )
}

export default ExpenseAccountInfo
