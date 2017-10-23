import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormLink from '../FormLink'
import FormNumber from '../FormNumber'
import FormTextArea from '../FormTextArea'
import './ExpenseDetailInfo.scss'

class ExpenseDetailInfo extends Component {
  static propTypes = {
    data: PropTypes.string,
    deleteHandler: PropTypes.func,
    title: PropTypes.string,
    setDate: PropTypes.func,
    detail: PropTypes.object,
    formatCurrency: PropTypes.func,
    setCostType: PropTypes.func,
    hasDel: PropTypes.bool
  }
  handlerBlur (target) {
    return this.props.formatCurrency.bind(this, target)
  }
  clickHandler (target) {
    return this.props.setDate.bind(this, target)
  }
  render () {
    const { data, deleteHandler, title, detail, hasDel, setCostType } = this.props
    return (
      <div className='wm-expense-detail-info'>
        <div className='detail-topic'>
          <span>{title}</span>
          { hasDel && <button type='button' className='close-button' onClick={deleteHandler}>删除</button> }
        </div>
        <div className='detail-units'>
          <FormLink
            text='费用类型'
            name={`${data}.feeName`}
            value={detail && detail.feeName ? detail.feeName : '请选择(必填)'}
            imgRight='imgs/icon_arrow.png'
            clickHandler={setCostType}
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
            value={detail && detail.startDate ? detail.startDate : '请选择(必填)'}
            imgRight='imgs/icon_arrow.png'
            clickHandler={this.clickHandler(detail.startDate)}
          />
          <FormTextArea
            name={`${data}.memo`}
            placeholder='备注：'
            maxLength={200} />
        </div>
      </div>
    )
  }
}

export default ExpenseDetailInfo
