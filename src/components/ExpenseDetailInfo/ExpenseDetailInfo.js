import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'
import FormText from '../FormText'
import FormNumber from '../FormNumber'
import FormTextArea from '../FormTextArea'
import './ExpenseDetailInfo.scss'

import ModalSelect from '../ModalSelect'

class ExpenseDetailInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openModal: false,
      options: [{ id: 1, value: 55 }, { id: 2, value: 66 }],
      active: 1
    }
  }
  selType () {
    console.log('hello how are you')
    this.setState({
      openModal: true
    })
  }
  modalConfirm (target) {
    this.setState({
      active: target
    })
    this.modalClose()
  }
  modalClose () {
    this.setState({
      openModal: false
    })
  }
  render () {
    const { data, deleteHandler, title } = this.props
    const { openModal, active, options } = this.state
    return (
      <div className='wm-expense-detail-info'>
        { openModal &&
          <ModalSelect
            options={ options }
            active={ active }
            select={ this.modalConfirm.bind(this) }
            close={ this.modalClose.bind(this) }
          />
        }
        <span>{ title }</span>
        <button type='button' className='close-button' onClick={ deleteHandler }>删除</button>
        <FormLink
          text='费用类型'
          name={ `${data}.feeType` }
          value='请选择(必须)'
          iconRight='fa-angle-right'
          clickHandler={ this.selType.bind(this) }
        />
        <FormNumber
          text='金额'
          decimal={ 2 }
          name={ `${data}.cash` } />
        <FormLink
          text='发生日期'
          name={ `${data}.startDate` }
          value='请选择(必须)'
          iconRight='fa-angle-right' />
        <FormTextArea
          name={ `${data}.memo` }
          placeholder='备注：' />
      </div>
    )
  }
}

export default ExpenseDetailInfo
