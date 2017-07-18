import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'
import FormText from '../FormText'
import FormNumber from '../FormNumber'
import FormTextArea from '../FormTextArea'
import './ExpenseDetailInfo.scss'

import ModalCost from '../ModalCost'

class ExpenseDetailInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openModal: false,
      active: -1,
      paths: []
    }
  }
  selType () {
    this.setState({
      openModal: true
    })
  }
  select (target, id, value, paths) {
    const { setCostType } = this.props
    this.setState({
      openModal: false,
      paths
    })
    setCostType(target, id, value)
  }
  render () {
    const { data, deleteHandler, title, costType, setDate, detail, formatCurrency } = this.props
    const { openModal, active, paths } = this.state
    return (
      <div className='wm-expense-detail-info'>
        { openModal &&
          <ModalCost
            costType={ costType }
            paths={ paths }
            select={ this.select.bind(this, `${data}`) }
            selType={ detail && detail.feeType ? detail.feeType : '' }
          />
        }
        <span>{ title }</span>
        <button type='button' className='close-button' onClick={ deleteHandler }>删除</button>
        <FormLink
          text='费用类型'
          name={ `${data}.feeName` }
          value={ detail && detail.feeName ? detail.feeName : '请选择(必须)' }
          iconRight='fa-angle-right'
          clickHandler={ this.selType.bind(this) }
        />
        <FormNumber
          text='金额'
          decimal={ 2 }
          name={ `${data}.cash` }
          handlerBlur={ formatCurrency.bind(this, `${data}.cash`) }
        />
        <FormLink
          text='发生日期'
          name={ `${data}.startDate` }
          value={ detail && detail.startDate ? detail.startDate : '请选择(必须)' }
          iconRight='fa-angle-right'
          clickHandler={ setDate.bind(this, detail.startDate) }
        />
        <FormTextArea
          name={ `${data}.memo` }
          placeholder='备注：' />
      </div>
    )
  }
}

export default ExpenseDetailInfo
