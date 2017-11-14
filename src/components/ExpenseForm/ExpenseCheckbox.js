import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormCheckbox from '../FormCheckbox'

export const ExpenseCheckbox = ({ isDelete }) => {
  return (
    <div className='wm-expense-checkbox'>
      <FormCheckbox
        value={isDelete}
        title='删除原有单据'
        name='isDelete'
      />
    </div>
  )
}

ExpenseCheckbox.propTypes = {
  parentId: PropTypes.number,
  isDelete: PropTypes.any
}

export default ExpenseCheckbox
