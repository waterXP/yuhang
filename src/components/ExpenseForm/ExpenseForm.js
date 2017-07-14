import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, initialize, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from '../ExpenseUserInfo'
import ExpenseDetailInfo from '../ExpenseDetailInfo'
import ExpenseAccountInfo from '../ExpenseAccountInfo'
import ExpenseAttachment from '../ExpenseAttachment'
import ConfirmButton from '../ConfirmButton'
import FormButton from '../FormButton'
import FormTextArea from '../FormTextArea'
import { fetchData, toast, getDate } from '@/lib/base'
import './ExpenseForm.scss'

import ModalSelect from '../ModalSelect'

class renderDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [1],
      nextTag: 2
    }
  }
  deleteInfo (i) {
    let { fields } = this.props
    const { tags, nextTag } = this.state
    let temp = [...tags]
    temp.splice(i, 1)
    this.setState({
      tags: temp,
    })
    fields.remove(i)
  }
  handleClick () {
    let { fields } = this.props
    const { tags, nextTag } = this.state
    let temp = [...tags]
    temp.push(nextTag)
    this.setState({
      tags: temp,
      nextTag: nextTag + 1
    })
    fields.push({id: nextTag})
  }
  setDate (target) {
    this.props.changeDate(target)
  }
  setCostType (target, id, value) {
    this.props.changeCostType(target, id, value)
  }
  render () {
    let { fields, costType, details, formatCurrency } = this.props
    const { tags } = this.state
    return (
      <div>
        {fields && fields.map((v, i) =>
          <ExpenseDetailInfo
           key={ tags[i] }
           data={ v }
           title={ `明细${tags[i]}` }
           deleteHandler={ this.deleteInfo.bind(this, i) }
           costType={ costType }
           setDate={ this.setDate.bind(this) }
           setCostType={ this.setCostType.bind(this) }
           detail={ details && details[i] }
           formatCurrency={ formatCurrency.bind(this) }
          />
        )}
        <ConfirmButton
          text=' 增加明细'
          icon='fa-plus'
          handleClick={ this.handleClick.bind(this) } />
      </div>
    )
  }
}

class ExpenseForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      openModal: false,
      target: -1,
      targetName: '',
      labelId: '',
      labelName: ''
    }    
  }

  componentDidMount () {
    this.initial()
  }

  modalOpen (options, target, targetName, labelId, labelName) {
    this.setState({
      openModal: true,
      options,
      target,
      targetName,
      labelId,
      labelName
    })
  }
  modalConfirm (value, label) {
    this.props.change(label, value)
    this.modalClose()
  }
  modalClose () {
    this.setState({
      openModal: false
    })
  }

  getCostType (deptId) {
    fetchData('get /costTypes/findCostTypeByDeptId.json', { deptId })
    .then((d) => {
      if (!d.result) {
        this.props.change('costType', d.data)
      }
    })
  }
  changeDate (target) {
    console.log(target)
    this.props.change(target, getDate())
  }
  changeCostType (target, id, value) {
    this.props.change(`${target}.feeType`, id)
    this.props.change(`${target}.feeName`, value)
  }
  formatCurrency (target, event, newValue, previousValue) {
    console.log(target)
    this.props.change(`${target}`, 3)
    newValue = 5
  }

  initial () {
    Promise.all([
      fetchData('get /expensesClaims/init.json'),
      fetchData('get /userAccounts/myAccountList.json')
    ])
    .then(([d1, d2]) => {
      if (!d1.result || !d2.result) {
        const { userName, deptsList, projectsList } = d1.data
        const { accountList } = d2.data
        this.props.dispatch(
          initialize('expenseForm', {
            userName,
            accountList: d2.data,
            selAccount: -1,
            selDept: 0,
            deptsList,
            details: [{id: 1}],
            costType: [],
            selProj: -1,
            projectsList: projectsList || []
          })
        )
        this.getCostType(deptsList[0].id)
      }
    })
  }

  departChange () {
    const { deptsList, selDept } = this.props
    this.modalOpen(deptsList, selDept, 'selDept')
  }
  projChange () {
    const { projectsList, selProj } = this.props
    this.modalOpen(projectsList, selProj, 'selProj')
  }
  accountChange () {
    const { accountList, selAccount } = this.props
    this.modalOpen(accountList, selAccount, 'selAccount', 'id', 'chooseBankName')
  }

  render () {
    const { handleSubmit, userName, totalCash, costType,
      deptsList, selDept, projectsList, selProj, accountList,
      selAccount, details } = this.props
    const testUserInfo = {
      defaultValue: { type: 'text', text: '请选择(必须)' },
      departments: {
        '1': {
          type: 'text',
          text: '费用系统项目部'
        }, '2':  {
          type: 'text',
          text: '财务部'
        }
      }
    }
    const { options, target, openModal, targetName, labelId, labelName } = this.state
    return (
      <form className='wm-expense-form' onSubmit={ handleSubmit }>
        { openModal &&
          <ModalSelect
            options={ options }
            active={ target }
            select={ this.modalConfirm.bind(this) }
            close={ this.modalClose.bind(this) }
            scope={ targetName }
            labelId={ labelId }
            labelName={ labelName }
          />
        }
        <ExpenseUserInfo
          deptName={ deptsList && selDept > -1 && deptsList[selDept].name }
          name={ userName }
          departChange={ this.departChange.bind(this) }
        />
        <FieldArray
          name='details'
          component={ renderDetails }
          costType={ costType }
          changeDate={ this.changeDate.bind(this) }
          changeCostType={ this.changeCostType.bind(this) }
          formatCurrency={ this.formatCurrency.bind(this) }
          details={ details }
        />
        <ExpenseAccountInfo
          totalCash={ totalCash() }
          projName={
            (projectsList && selProj > -1) ?
              projectsList[selProj].name :
              '请选择(必须)'
          }
          projChange={ this.projChange.bind(this) }
          accountName={
            (accountList && selAccount > -1) ?
              accountList[selAccount].chooseBankName :
              '请选择(必须)'
          }
          accountChange={ this.accountChange.bind(this) }
        />
        <ExpenseAttachment />
        <FormTextArea
          name='auditor'
          placeholder='审批人' />
        <FormButton text='存草稿' />
        <FormButton
          type='submit'
          text='提交'/>
      </form>
    )    
  }
}

const selector = formValueSelector('expenseForm')

export default connect(
  state => ({
    query: state.location.query,
    userName: selector(state, 'userName'),
    costType: selector(state, 'costType'),
    selDept: selector(state, 'selDept'),
    selProj: selector(state, 'selProj'),
    selAccount: selector(state, 'selAccount'),
    details: selector(state, 'details'),
    totalCash: () => {
      let totalCash = 0
      let details = selector(state, 'details')
      if (details) {
        details.forEach((v) => {
          if (!isNaN(+v.cash)) {
            totalCash += +v.cash
          }
        })
      }
      return totalCash
    },
    deptsList: selector(state, 'deptsList'),
    projectsList: selector(state, 'projectsList'),
    accountList: selector(state, 'accountList'),
    initialValues: { details: [{}] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
