import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ExpenseApprover.scss'

const ExpenseApprover = ({ approvers }) => {
  return (
    <div className='wm-expense-approver'>
      <p>审批人</p>
      { approvers && approvers.length > 0 && approvers.map((v, i) =>
        <div className='approvers' key={ v.id }>
          <div className='approverInfo'>
            <img className='avatar' src={ v.avatar } />
            <p>{ v.nickName }</p>
          </div>
          <i className='fa fa-arrow-right' />
        </div>
      )}
    </div>
  )
}

export default ExpenseApprover
