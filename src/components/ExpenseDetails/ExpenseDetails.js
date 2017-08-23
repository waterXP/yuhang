import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpenseDetailInfo from '../ExpenseDetailInfo'
import ConfirmButton from '../ConfirmButton'
import { getDate, openDatePicker, blurInput } from '@/lib/base'

import { isDev } from '@/config'

class ExpenseDetails extends Component {
  static propTypes = {
    fields: PropTypes.object,
    updateTags: PropTypes.func,
    tags: PropTypes.array,
    updateNextTag: PropTypes.func,
    nextTag: PropTypes.number,
    changeDate: PropTypes.func,
    details: PropTypes.array,
    formatCurrency: PropTypes.func,
    setCostType: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.setDate = this.setDate.bind(this)
    this.setCostType = this.setCostType.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  deleteHandler (i) {
    return () => this.deleteInfo(i)
  }
  deleteInfo (i) {
    blurInput()
    let { fields, updateTags, tags } = this.props
    let temp = [...tags]
    temp.splice(i, 1)
    updateTags(temp)
    fields.remove(i)
  }
  handleClick () {
    blurInput()
    let { fields, updateTags, updateNextTag, tags, nextTag } = this.props
    let temp = [...tags]
    temp.push(nextTag)
    updateTags(temp)
    updateNextTag(nextTag + 1)
    fields.push({ id: nextTag })
  }
  setDate (value, target) {
    blurInput()
    if (isDev) {
      this.props.changeDate(target, getDate(+new Date(), 'yyyy-MM-dd'))
    }
    const defaultValue = value ? +new Date(value) : +new Date()
    openDatePicker(defaultValue, (newDate) =>
      this.props.changeDate(target, newDate))
  }
  setCostType (index) {
    return this.props.setCostType.bind(this, index)
  }
  formatHandle () {
    return this.props.formatCurrency.bind(this)
  }
  render () {
    let { fields, details, tags } = this.props
    return (
      <div>
        {tags && fields && fields.map((v, i) =>
          <ExpenseDetailInfo
            key={tags[i]}
            hasDel={tags.length > 1}
            data={v}
            title={
              // The idiot's decision, use tags[i] is better
              `明细${i + 1}`
            }
            deleteHandler={this.deleteHandler(i)}
            setDate={this.setDate}
            setCostType={this.setCostType(i)}
            detail={details && details[i]}
            formatCurrency={this.formatHandle()}
          />
        )}
        <ConfirmButton
          text=' 增加明细'
          icon='fa-plus'
          handleClick={this.handleClick} />
      </div>
    )
  }
}

export default ExpenseDetails
