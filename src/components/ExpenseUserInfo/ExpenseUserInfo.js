import React from 'react'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import FormSelect from '../FormSelect'

export const ExpenseUserInfo = ({ name, deptName, departChange }) => {
  return (
    <div>
      <FormLabel text='报销人' name='name' value={ name } />
      <FormSelect
        text='部门'
        name='deptName'
        value={ deptName }
        iconRight='fa-angle-right'
        clickHandler={ departChange }
      />
    </div>
  )
}

export default ExpenseUserInfo
