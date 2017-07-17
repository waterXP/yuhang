import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, initialize, formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from '../ExpenseUserInfo'
import ExpenseDetailInfo from '../ExpenseDetailInfo'
import ExpenseAccountInfo from '../ExpenseAccountInfo'
import ExpenseAttachment from '../ExpenseAttachment'
import ExpenseApprover from '../ExpenseApprover'
import ConfirmButton from '../ConfirmButton'
import FormButton from '../FormButton'
import FormTextArea from '../FormTextArea'
import { fetchData, toast, getDate, getNumber, goLocation } from '@/lib/base'
import { saveData, loadData } from '@/routes/New/modules/new'
import './ExpenseForm.scss'

import ModalSelect from '../ModalSelect'
import testImg from '@/routes/SettingsAccounts/assets/Duck.jpg'

class renderDetails extends Component {
  deleteInfo (i) {
    let { fields, updateTags, tags, nextTag  } = this.props
    let temp = [...tags]
    temp.splice(i, 1)
    updateTags(temp)
    fields.remove(i)
  }
  handleClick () {
    let { fields, updateTags, updateNextTag, tags, nextTag } = this.props
    let temp = [...tags]
    temp.push(nextTag)
    updateTags(temp)
    updateNextTag(nextTag + 1)
    fields.push({id: nextTag})
  }
  setDate (target) {
    this.props.changeDate(target)
  }
  setCostType (target, id, value) {
    this.props.changeCostType(target, id, value)
  }

  render () {
    let { fields, costType, details, formatCurrency, tags } = this.props
    return (
      <div>
        {tags && fields && fields.map((v, i) =>
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
    let { query, data } = this.props
    if (query.from && data) {
      this.initial(data)
    } else {
      this.initial()
    }
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
  modalConfirm (value, label, id) {
    if (label === 'selAccount' && id < 0) {
      this.save()
      let pathname = id === -.2 ? '/settings/edit/alipay' :
        '/settings/edit/account'
      goLocation({
        pathname,
        query: {
          from: '/new'
        }
      })
      return
    }
    this.props.change(label, value)
    this.modalClose()
  }
  modalClose () {
    this.setState({
      openModal: false
    })
  }

  save () {
    const {
      userName, accountList, selAccount,
      selDept, deptsList, details,
      costType, selProj, projectsList,
      attachmentList, approvers, dispatch,
      tags, nextTag
    } = this.props
    dispatch(
      saveData({
        userName,
        selAccount,
        selDept,
        deptsList,
        details,
        costType,
        selProj,
        projectsList,
        attachmentList,
        approvers,
        tags,
        nextTag
      })
    )
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
    this.props.change(target, getDate())
  }
  changeCostType (target, id, value) {
    this.props.change(`${target}.feeType`, id)
    this.props.change(`${target}.feeName`, value)
  }
  formatCurrency (target, event, newValue, previousValue) {
    event.preventDefault()
    this.props.change(`${target}`, getNumber(newValue))
  }

  initial (data) {
    if (data) {
      const {
        userName, accountList, selAccount,
        selDept, deptsList, details,
        costType, selProj, projectsList,
        attachmentList, approvers, dispatch,
        tags, nextTag
      } = data
      fetchData('get /userAccounts/myAccountList.json')
      .then((d) => {
        if (!d.result) {
          const accountList = d.data
          this.props.dispatch(
            initialize('expenseForm', {
              userName,
              accountList: accountList || [],
              selAccount: accountList.length - 1,
              selDept,
              deptsList,
              details,
              costType,
              selProj,
              projectsList,
              attachmentList,
              approvers,
              tags,
              nextTag,
              type: 1
            })
          )          
        }
      })
    } else {
      Promise.all([
        fetchData('get /expensesClaims/init.json'),
        fetchData('get /userAccounts/myAccountList.json')
      ])
      .then(([d1, d2]) => {
        if (!d1.result || !d2.result) {
          const { userName, deptsList, projectsList, usersList } = d1.data
          const accountList = d2.data
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
              projectsList: projectsList || [],
              attachmentList: [],
              approvers: usersList || [],
              tags: [1],
              nextTag: 2,
              type: 1
            })
          )
          this.getCostType(deptsList[0].id)
        }
      })      
    }
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
    const newCard = accountList.length < 5 ? [{
        id: -.1,
        chooseBankName: '新增银行卡'
      }, {
        id: -.2,
        chooseBankName: '新增支付宝'
      }] : []
    this.modalOpen([...accountList, ...newCard], selAccount, 'selAccount', 'id', 'chooseBankName')
  }
  addAttachment () {
    let temp = this.props.attachmentList || []
    this.props.change('attachmentList', [...temp, testImg])
  }
  removeAttachment (i) {
    let temp = [...this.props.attachmentList]
    temp.splice(i, 1)
    this.props.change('attachmentList', temp)
  }

  updateNextTag (nextTag) {
    this.props.change('nextTag', nextTag)
  }
  updateTags (tags) {
    this.props.change('tags', tags)
  }

  commit (draft) {
    const { type, deptsList, selDept, details, totalCash, selAccount, accountList, projectsList, selProj, attachmentList } = this.props
    const dept = deptsList[selDept]
    const account = accountList[selAccount]
    const project = projectsList[selProj]
    let detailses = []
    let attachmentUrls = [...attachmentList]
    if (selDept < 0 || selAccount < 0 || selProj < 0) {
      toast('提交参数不完整')
      return
    }
    let valid = true
    details.forEach((v) => {
      if (!v.id || !v.cash || !v.startDate) {
        valid = false
      }
      detailses.push({
        costTypeId: v.feeType,
        costTypeName: v.feeName,
        money: +v.cash,
        eventTime: v.startDate,
        remark: v.memo || ''
      })
    })
    if (!valid) {
      toast('提交参数不完整')
      return
    }
    let params = {
      deptId: dept.id,
      type,
      deptDingId: dept.dingDeptid,
      deptName: dept.appendParentName,
      detailses,
      summoney: totalCash(),
      userAccountId: account.id,
      accountName: account.chooseBankName,
      projectId: project.id,
      projectName: project.name,
      attachmentUrls
    }
    const action = draft ? 'post /expensesClaims/dingSave.jso' : 'post /expensesClaims/dingSubmit.json'
    fetchData(action, params)
    .then((d) => {
      if (d.result === 0) {
        goLocation({
          pathname: '/approval/main',
          query: {
            active: 2
          }
        })
      } else {
        toast(d.msg)
      }
    })

  }

  render () {
    const { handleSubmit, userName, totalCash, costType,
      deptsList, selDept, projectsList, selProj, accountList,
      selAccount, details, attachmentList, approvers,
      tags, nextTag } = this.props
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
          tags={ tags }
          nextTag={ nextTag }
          costType={ costType }
          changeDate={ this.changeDate.bind(this) }
          changeCostType={ this.changeCostType.bind(this) }
          formatCurrency={ this.formatCurrency.bind(this) }
          details={ details }
          updateTags={ this.updateTags.bind(this) }
          updateNextTag={ this.updateNextTag.bind(this) }
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
        <ExpenseAttachment
          attachmentList={ attachmentList }
          addAttachment={ this.addAttachment.bind(this) }
          removeAttachment={ this.removeAttachment.bind(this) }
        />
        <ExpenseApprover approvers={ approvers } />
        <FormButton text='存草稿' onClick={ this.commit.bind(this, true) } />
        <FormButton
          type='submit'
          text='提交'
          onClick={ this.commit.bind(this) }
        />
      </form>
    )    
  }
}

const selector = formValueSelector('expenseForm')

export default connect(
  state => ({
    query: state.location.query,
    data: state.new.data,
    userName: selector(state, 'userName'),
    costType: selector(state, 'costType'),
    selDept: selector(state, 'selDept'),
    selProj: selector(state, 'selProj'),
    selAccount: selector(state, 'selAccount'),
    details: selector(state, 'details'),
    approvers: selector(state, 'approvers'),
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
    attachmentList: selector(state, 'attachmentList'),
    tags: selector(state, 'tags'),
    nextTag: selector(state, 'nextTag'),
    type: selector(state, 'type'),
    initialValues: { details: [{}] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
