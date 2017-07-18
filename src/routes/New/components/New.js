import React, { Component } from 'react'
import ExpenseForm from '@/components/ExpenseForm'
import './New.scss'

class New extends Component {
  render () {
    return (
      <div className='wm-new wm-new-personal-expense'>
        <ExpenseForm />
      </div>
    )
  }
}

export default New
