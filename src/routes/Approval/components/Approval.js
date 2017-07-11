import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Approval.scss'
import { Link } from 'react-router'

import ApprovalNavs from '@/components/ApprovalNavs'
import ApprovalConditions from '@/components/ApprovalConditions'
import ApprovalList from '@/components/ApprovalList'

export const Approval = ({ children, active, updateActive, list }) => (
  <div className='wm-approval'>
    { children ? children :
      <div>
        <ApprovalNavs
          active={ active }
          updateActive={ updateActive }
        />
        <ApprovalConditions />
        <ApprovalList
          list={ list }
          filter={ active }
        />
      </div>
    }
  </div>
)

Approval.propTypes = {
  active: PropTypes.number.isRequired,
  updateActive: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    bill: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Approval
