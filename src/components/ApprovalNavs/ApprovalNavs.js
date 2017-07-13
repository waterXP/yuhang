import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalNavs.scss'
import ApprovalNav from '../ApprovalNav'
import { approvalStatus } from '@/lib/enums'
import { getArray } from '@/lib/base'

class ApprovalNavs extends Component {
  static propTypes = {
    active: PropTypes.number.isRequired,
    updateActive: PropTypes.func.isRequired
  }

  handleClick = (active) => {
    this.props.updateActive(active)
  }

  render () {
    const { active, updateActive } = this.props
    const arr = getArray(approvalStatus)
    return (
      <ul className='wm-approval-navs'>
        { arr.map((nav, i) => {
          return <ApprovalNav
            key={ i }
            name={ nav }
            handleClick={ this.handleClick.bind(this, i) }
            active={ active === i ? 'acitve' : '' }
          />
        })}
      </ul>
    )
  }
}

export default ApprovalNavs
