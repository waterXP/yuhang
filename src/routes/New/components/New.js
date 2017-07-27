import React, { Component } from 'react'
import ExpenseForm from '@/components/ExpenseForm'
import './New.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

class New extends Component {
  componentDidMount () {
    dingSetTitle('个人报销')
    dingSetNavRight('')
  }
  render () {
    return (
      <div className='wm-new wm-new-personal-expense'>
        <ExpenseForm />
      </div>
    )
  }
}

export default New
