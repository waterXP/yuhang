import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpenseForm from '@/components/ExpenseForm'
import './New.scss'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

class New extends Component {
  static propTypes = {
    children: PropTypes.element
  }
  componentDidMount () {
    dingSetTitle('个人报销')
    dingSetNavRight('')
  }
  render () {
    const { children } = this.props
    return (
      <div className='wm-new wm-new-personal-expense'>
        { children || <ExpenseForm /> }
      </div>
    )
  }
}

export default New
