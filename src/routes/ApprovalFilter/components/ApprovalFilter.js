import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ApprovalFilter.scss'

class ApprovalFilter extends Component {
  static propTypes = {
   //  ApprovalFilter: PropTypes.func.isRequired,
   //  exampleArray: PropTypes.arrayOf(PropTypes.shape({
   //    homePage: PropTypes.bool,
   //    iconClass: PropTypes.string.isRequired,
   //    title: PropTypes.number,
   //    linkUrl: PropTypes.string.isRequired,
   //    btnType: PropTypes.string
   // }).isRequired).isRequired
  }

  render () {
    return (
      <div className='wm-approval-filter'>
        <div className='bill-filter'>
          <p className='topic'><span className='fa fa-circle'></span>&nbsp;输入金额区间</p>
        </div>
        <div className='type-filter'>
          <p className='topic'><span className='fa fa-circle'></span>&nbsp;选择筛选条件</p>
        </div>
      </div>
    )
  }
}

export default ApprovalFilter

