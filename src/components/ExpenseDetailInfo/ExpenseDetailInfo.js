import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'
import FormNumber from '../FormNumber'
import FormTextArea from '../FormTextArea'
import './ExpenseDetailInfo.scss'
import { blurInput } from '@/lib/base'
import ModalCost from '../ModalCost'

class ExpenseDetailInfo extends Component {
  static propTypes = {
    data: PropTypes.string,
    deleteHandler: PropTypes.func,
    title: PropTypes.string,
    costType: PropTypes.array,
    setDate: PropTypes.func,
    detail: PropTypes.object,
    formatCurrency: PropTypes.func,
    setCostType: PropTypes.func,
    hasDel: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      openModal: false,
      paths: []
    }
    this.selType = this.selType.bind(this)
  }
  selType () {
    blurInput()
    this.setState({
      openModal: true
    })
  }
  selectHandle (target) {
    return this.select.bind(this, target)
  }
  handlerBlur (target) {
    return this.props.formatCurrency.bind(this, target)
  }
  select (target, id, value, paths) {
    const { setCostType } = this.props
    this.setState({
      openModal: false,
      paths
    })
    setCostType(target, id, value)
  }
  clickHandler (target) {
    return this.props.setDate.bind(this, target)
  }
  render () {
    const { data, deleteHandler, title, costType, detail, hasDel } = this.props
    const { openModal, paths } = this.state
    return (
      <div className='wm-expense-detail-info'>
        { openModal &&
          <ModalCost
            costType={costType}
            paths={detail.feeName ? paths : []}
            select={this.selectHandle(`${data}`)}
            selType={detail && detail.feeType ? detail.feeType : ''}
          />
        }
        <span>{title}</span>
        { hasDel && <button type='button' className='close-button' onClick={deleteHandler}>删除</button> }
        <FormLink
          text='费用类型'
          name={`${data}.feeName`}
          value={detail && detail.feeName ? detail.feeName : '请选择(必须)'}
          iconRight='fa-angle-right'
          clickHandler={this.selType}
        />
        <FormNumber
          text='金额'
          decimal={2}
          name={`${data}.cash`}
          handlerBlur={this.handlerBlur(`${data}.cash`)}
          placeholder='输入金额'
        />
        <FormLink
          text='发生日期'
          name={`${data}.startDate`}
          value={detail && detail.startDate ? detail.startDate : '请选择(必须)'}
          iconRight='fa-angle-right'
          clickHandler={this.clickHandler(detail.startDate)}
        />
        <FormTextArea
          name={`${data}.memo`}
          placeholder='备注：'
          maxLength={200} />
      </div>
    )
  }
}

export default ExpenseDetailInfo
