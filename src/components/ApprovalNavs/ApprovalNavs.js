import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalNavs.scss'
import ApprovalNav from '../ApprovalNav'
import { approvalStatus } from '@/lib/enums'
import { getArray } from '@/lib/base'

import navsImg0 from './assets/approvalNav1.png'
import navsImg1 from './assets/approvalNav2.png'
import navsImg2 from './assets/approvalNav3.png'
import navsImg3 from './assets/approvalNav4.png'

const navsImg = [navsImg0, navsImg1, navsImg2, navsImg3]

class ApprovalNavs extends Component {
  static propTypes = {
    active: PropTypes.number.isRequired,
    updateActive: PropTypes.func.isRequired
  }

  handleClick (active) {
    return () => this.props.updateActive(active)
  }

  render () {
    const { active } = this.props
    const arr = getArray(approvalStatus)
    return (
      <ul className='wm-approval-navs'>
        { arr.map((nav, i) => {
          return <ApprovalNav
            key={i}
            name={nav}
            handleClick={this.handleClick(i)}
            imgsrc={navsImg[i - 1]}
            active={active === i ? 'acitve' : ''}
          />
        })}
      </ul>
    )
  }
}

export default ApprovalNavs
