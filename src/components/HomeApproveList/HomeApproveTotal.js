import React, { Component } from 'react'
import './HomeApproveTotal.scss'
import { getCash } from '@/lib/base'
import PropTypes from 'prop-types'

class HomeApproveTotal extends Component {
  render () {
    let sumMoney = getCash(this.props.total)
    return (
      <div className='wm-homeApprove'>
        <h5>金额总计</h5>
        <h5><span>{sumMoney}</span>元</h5>
      </div>
    )
  }
}
HomeApproveTotal.propTypes = {
  total:PropTypes.number
}

export default HomeApproveTotal
