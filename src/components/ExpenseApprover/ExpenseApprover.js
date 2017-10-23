import React from 'react'
import PropTypes from 'prop-types'
import './ExpenseApprover.scss'

const ExpenseApprover = ({ approvers }) => {
  return (
    <div className='wm-expense-approver'>
      <p>审批人</p>
      <div className='approve-list'>
        { approvers && approvers.length > 0 && approvers.map((v, i) =>
          <div className='approvers' key={v.id}>
            <div className='approverInfo'>
              <img className='avatar' src={v.avatar} />
              <p className='nick-name'>{ v.nickName }</p>
            </div>
            { approvers.length !== i + 1 && <img className='next-flag' src='imgs/icon_next.png' /> }
          </div>
        )}
      </div>
    </div>
  )
}

ExpenseApprover.propTypes = {
  approvers: PropTypes.array
}

export default ExpenseApprover
