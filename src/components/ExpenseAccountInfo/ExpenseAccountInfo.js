import React from 'react'
import PropTypes from 'prop-types'
import FormSelect from '../FormSelect'
import { getCash } from '@/lib/base'
import './ExpenseAccountInfo.scss'

export const ExpenseAccountInfo = ({ totalCash, accountChange, accountName, projChange, projName }) => {
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
        value={ accountName }
        clickHandler={ accountChange }
        iconRight='fa-angle-right' />
      <FormSelect
        text='项目'
        name='subject'
        value={ projName }
        clickHandler={ projChange }
        iconRight='fa-angle-right'
      />
    </div>
  )
}

export default ExpenseAccountInfo
