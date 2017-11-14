import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExpenseDetailInfo from './ExpenseDetailInfo'
import ConfirmButton from '../ConfirmButton'
import { getDate, blurInput } from '@/lib/base'
import { openDatePicker, toast } from '@/lib/ddApi'

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
    setCostType: PropTypes.func,
    setPos: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.setDate = this.setDate.bind(this)
    this.setCostType = this.setCostType.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      setPos: false
    }
  }
  componentDidUpdate () {
    if (this.state.setPos) {
      this.props.setPos(this.areaRef.offsetHeight - 240)
      this.setState({
        setPos: false
      })
    }
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
    let { fields, updateTags, updateNextTag,
      tags, nextTag } = this.props
    let temp = [...tags]
    temp.push(nextTag)
    updateTags(temp)
    updateNextTag(nextTag + 1)
    fields.push({ id: nextTag })
    this.setState({
      setPos: true
    })
  }
  setDate (value, target) {
    blurInput()
    if (isDev) {
      this.props.changeDate(target, getDate(+new Date(), 'yyyy-MM-dd'))
    }
    const defaultValue = value ? +new Date(value) : +new Date()
    openDatePicker(defaultValue, (newDate) => {
      if (+new Date(newDate) > +new Date()) {
        toast('时间不能大于当前时间')
      } else {
        this.props.changeDate(target, newDate)
      }
    })
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
      <div ref={el => this.areaRef = el}>
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
          text='增加明细'
          img='imgs/icon_add.png'
          handleClick={this.handleClick} />
      </div>
    )
  }
}

export default ExpenseDetails
