import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpenseForm from '@/components/ExpenseForm'

class NewPersonalExpense extends Component {
  render () {
    return (
      <div className='wm-new-personal-expense'>
        <ExpenseForm />
      </div>
    )
  }
}

export default NewPersonalExpense

