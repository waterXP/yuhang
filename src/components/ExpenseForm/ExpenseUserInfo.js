import React from 'react'
import PropTypes from 'prop-types'
import FormLabel from '../FormLabel'
import FormSelect from '../FormSelect'
import FormTextArea from '../FormTextArea'

export const ExpenseUserInfo = ({ name, deptName, departChange, illustrate, type }) => {
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
      <FormTextArea
        name='illustrate'
        placeholder='说明：'
        value={illustrate}
        maxLength={50} />
    </div>
  )
}

ExpenseUserInfo.propTypes = {
  name: PropTypes.string,
  deptName: PropTypes.string,
  departChange: PropTypes.func,
  illustrate: PropTypes.string,
  type: PropTypes.number
}

export default ExpenseUserInfo
