import React, { Component } from 'react'
import { getCash } from '@/lib/base'
import PropTypes from 'prop-types'
import './HomeApproveTotal.scss'

class HomeApproveTotal extends Component {
  render () {
    return (
      <div className='wm-home-approve-total'>
        <span className='span-name'>总计</span>
        <span className='span-value'>{getCash(this.props.total)}</span>
      </div>
    )
  }
}
HomeApproveTotal.propTypes = {
  total:PropTypes.number
}

export default HomeApproveTotal
