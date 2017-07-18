import React from 'react'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import FormSelect from '../FormSelect'

export const ExpenseUserInfo = ({ name, deptName, departChange, type }) => {
  return (
    <div>
      <FormLabel text='报销人' name='name' value={ name } />
      <FormSelect
        text='部门'
        name='deptName'
        value={ deptName }
        iconRight={ type < 2 ? 'fa-angle-right' : '' }
        clickHandler={ departChange }
      />
    </div>
  )
}

export default ExpenseUserInfo
