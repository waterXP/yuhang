import React, { Component } from 'react'
import NewPersonalExpense from '../../NewPersonalExpense'
import ExpenseForm from '@/components/ExpenseForm'
import './New.scss'

class New extends Component {
  addExpense (val) {
    console.log(val)
  }

  render () {
    const { children } = this.props
    return (
      <div className='wm-new wm-new-personal-expense'>
        {children ? children :
          <ExpenseForm onSubmit={ this.addExpense } />
        }
      </div>
    )
  }
}

New.propTypes = {
 //  new: PropTypes.func.isRequired,
 //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
 //    homePage: PropTypes.bool,
 //    iconClass: PropTypes.string.isRequired,
 //    title: PropTypes.number,
 //    linkUrl: PropTypes.string.isRequired,
 //    btnType: PropTypes.string
 // }).isRequired).isRequired
}

export default New

