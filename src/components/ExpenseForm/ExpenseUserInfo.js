import React from 'react'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import FormSelect from '../FormSelect'

export const ExpenseUserInfo = ({ name, deptName, departChange, type }) => {
  return (
    <div className='wm-expense-user-info'>
      <FormLabel text='报销人' name='name' value={name} />
      <FormSelect
        text='部门'
        name='deptName'
        value={deptName}
        imgRight={type < 2 ? 'imgs/icon_arrow.png' : ''}
        clickHandler={departChange}
      />
    </div>
  )
}

ExpenseUserInfo.propTypes = {
  name: PropTypes.string,
  deptName: PropTypes.string,
  departChange: PropTypes.func,
  type: PropTypes.number
}

export default ExpenseUserInfo
