import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FieldArray, reduxForm, initialize,
  formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from '../ExpenseUserInfo'
import ExpenseDetails from '../ExpenseDetails'
import ExpenseAccountInfo from '../ExpenseAccountInfo'
import ExpenseAttachment from '../ExpenseAttachment'
import ExpenseApprover from '../ExpenseApprover'
import FormButton from '../FormButton'
import { fetchData, toast, getDate, getNumber,
  goLocation, openChosen, getChosenSource,
  uploadImage, previewImage } from '@/lib/base'
import { saveData } from '@/routes/New/modules/new'
import './ExpenseForm.scss'

import { isDev } from '@/config'

import ModalSelect from '../ModalSelect'

class ExpenseForm extends Component {
  static propTypes = {
    query: PropTypes.object,
    data: PropTypes.object,
    dispatch: PropTypes.func,
    change: PropTypes.func,
    userName: PropTypes.string,
    selAccount: PropTypes.number,
    selDept: PropTypes.number,
    deptsList: PropTypes.array,
    details: PropTypes.array,
    costType: PropTypes.array,
    selProj: PropTypes.number,
    projectsList: PropTypes.array,
    attachmentList: PropTypes.array,
    approvers: PropTypes.array,
    tags: PropTypes.array,
    nextTag: PropTypes.number,
    type: PropTypes.number,
    accountList: PropTypes.array,
    totalCash: PropTypes.func,
    deptDingId: PropTypes.string,
    deptId: PropTypes.number,
    deptName: PropTypes.string,
    originAttachments: PropTypes.array,
    restAttachments: PropTypes.array,
    handleSubmit: PropTypes.func
  }

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
    this.modalConfirm = this.modalConfirm.bind(this)
    this.modalClose = this.modalClose.bind(this)
    this.departChange = this.departChange.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.changeCostType = this.changeCostType.bind(this)
    this.formatCurrency = this.formatCurrency.bind(this)
    this.updateTags = this.updateTags.bind(this)
    this.updateNextTag = this.updateNextTag.bind(this)
    this.projChange = this.projChange.bind(this)
    this.accountChange = this.accountChange.bind(this)
    this.showImg = this.showImg.bind(this)
    this.addAttachment = this.addAttachment.bind(this)
    this.removeAttachment = this.removeAttachment.bind(this)
  }

  componentDidMount () {
    let { query, data } = this.props
    if (query.from && data) {
      this.initial(data)
    } else {
      if (query.id) {
        this.getModify(query.id)
      }
      this.initial()
    }
  }

  getModify (id) {
    fetchData('get /expensesClaims/modify.json', { id })
    .then((d) => {
      if (!d.result) {
        this.initModify(d.data)
      }
    })
  }

  initModify (d) {
    Promise.all([
      fetchData('get /expensesClaims/init.json'),
      fetchData('get /userAccounts/myAccountList.json')
    ])
    .then(([d1, d2]) => {
      if (!d1.result || !d2.result) {
        const { deptsList, projectsList, usersList } = d1.data
        const accountList = d2.data
        const { userAccountId, projectId, deptId } = d.expensesClaims

        let details = []
        let tags = []
        if (d.detailsList) {
          d.detailsList.forEach((v, i) => {
            details.push({
              id: i + 1,
              cash: v.money !== null ? getNumber(v.money) : '',
              startDate: v.eventTime || '',
              memo: v.remark || '',
              feeName: v.costTypeName || '',
              feeType: v.costTypeId || ''
            })
            tags.push(i + 1)
          })
        }

        let selDept = deptId !== null
          ? deptsList.findIndex((v) => v.id === deptId)
          : 0
        selDept = selDept > -1 ? selDept : 0

        this.props.dispatch(
          initialize('expenseForm', {
            userName: d.userName,
            accountList: d2.data,
            selAccount: userAccountId !== null
              ? accountList.findIndex((v) => v.id === userAccountId)
              : -1,
            selDept,
            deptsList,
            details,
            costType: [],
            selProj: projectId !== null
              ? projectsList.findIndex((v) => v.id === projectId)
              : -1,
            projectsList: projectsList || [],
            attachmentList: [],
            originAttachments: d.attachmentList,
            restAttachments: [...d.attachmentList],
            approvers: usersList || [],
            tags,
            nextTag: tags.length + 1,
            type: d.expensesClaims.type,
            deptDingId: d.dingDeptid,
            deptId: d.expensesClaims.deptId,
            deptName: d.deptName
          })
        )
        this.getCostType(deptsList[0].id)
      }
    })
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
      let pathname = id === -0.2
        ? '/settings/edit/alipay'
        : '/settings/edit/account'
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
      userName, selAccount, selDept,
      deptsList, details, costType,
      selProj, projectsList, attachmentList,
      approvers, dispatch, tags, nextTag
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

  changeDate (target, value) {
    this.props.change(target, getDate(value, 'yyyy-MM-dd'))
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
        userName, selDept, deptsList, details,
        costType, selProj, projectsList,
        attachmentList, approvers, tags, nextTag
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
              originAttachments: [],
              restAttachments: [],
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
        if ((!d1.result || !d2.result) && d1.data && d2.data) {
          const { userName, deptsList,
            projectsList, usersList } = d1.data
          this.props.dispatch(
            initialize('expenseForm', {
              userName,
              accountList: d2.data,
              selAccount: -1,
              selDept: 0,
              deptsList,
              details: [{ id: 1 }],
              costType: [],
              selProj: -1,
              projectsList: projectsList || [],
              attachmentList: [],
              originAttachments: [],
              restAttachments: [],
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
    const { deptsList, selDept, type } = this.props
    if (type > 1) {
      return
    }
    if (isDev) {
      this.modalOpen(deptsList, selDept, 'selDept', 'id', 'appendParentName')
    } else {
      let selectedKey = selDept > -1
        ? deptsList[selDept].appendParentName
        : deptsList[0].appendParentName
      let source = getChosenSource(deptsList, 'appendParentName')
      openChosen(source, selectedKey, (v) => {
        this.props.change('selDept', +v.value)
      })
    }
  }
  projChange () {
    const { projectsList, selProj } = this.props
    if (isDev) {
      this.modalOpen(projectsList, selProj, 'selProj')
    } else {
      let selectedKey = selProj > -1
        ? projectsList[selProj].name
        : projectsList[0].name
      let source = getChosenSource(projectsList)
      openChosen(source, selectedKey, (v) => {
        this.props.change('selProj', +v.value)
      })
    }
  }
  accountChange () {
    const { accountList, selAccount } = this.props
    const newCard = accountList.length < 5
      ? [{
        id: -0.1,
        chooseBankName: '新增银行卡'
      }, {
        id: -0.2,
        chooseBankName: '新增支付宝'
      }]
      : []
    let list = [...accountList, ...newCard]
    if (isDev) {
      this.modalOpen(list, selAccount, 'selAccount', 'id', 'chooseBankName')
    } else {
      let selectedKey = selAccount >= 0
        ? accountList[selAccount].chooseBankName
        : accountList[0].chooseBankName
      let source = getChosenSource(list, 'chooseBankName')
      openChosen(source, selectedKey, (v) => {
        const id = list[+v.value].id
        if (id >= 0) {
          this.props.change('selAccount', +v.value)
        } else {
          this.save()
          let pathname = id === -0.2
            ? '/settings/edit/alipay'
            : '/settings/edit/account'
          goLocation({
            pathname,
            query: {
              from: '/new'
            }
          })
        }
      })
    }
  }
  showImg (img) {
    previewImage(img)
  }
  addAttachment () {
    let temp = this.props.attachmentList || []
    if (isDev) {
      this.props.change('attachmentList', [...temp,
        'https://yfl2.taofairy.com/wangbacms/hqh/images/home_01.png'])
    } else {
      uploadImage((v) => {
        this.props.change('attachmentList', [...temp, v[0]])
      })
    }
  }
  removeAttachment (i, target) {
    let temp = [...this.props[target]]
    temp.splice(i, 1)
    this.props.change(target, temp)
  }

  updateNextTag (nextTag) {
    this.props.change('nextTag', nextTag)
  }
  updateTags (tags) {
    this.props.change('tags', tags)
  }

  commit (draft) {
    const { type, deptsList, selDept, details, totalCash,
      selAccount, accountList, projectsList, selProj,
      attachmentList, deptDingId, deptId, deptName,
      query, originAttachments, restAttachments } = this.props
    const account = accountList[selAccount]
    const project = projectsList[selProj]
    let detailses = []
    let attachmentUrls = [...attachmentList]
    if (!draft && (type < 2 && selDept < 0 ||
      selAccount < 0 || selProj < 0 || type > 2 &&
      !deptId && !deptDingId && !deptName)) {
      let str = ''
      if (selAccount < 0) {
        str = '收款账号未选择'
      } else if (selProj < 0) {
        str = '项目未选择'
      } else {
        str = '部门未选择'
      }
      toast(str)
      return
    }
    let valid = true
    if (!draft && details.length === 0) {
      toast('请配置费用明细')
      return
    }
    details.forEach((v) => {
      if (!draft && (!v.id || !v.cash || !v.startDate)) {
        valid = false
      }
      detailses.push({
        costTypeId: v.feeType || '',
        costTypeName: v.feeName || '',
        money: v.cash ? +v.cash : '',
        eventTime: v.startDate || '',
        remark: v.memo || ''
      })
    })
    if (!valid) {
      toast('费用明细不完整')
      return
    }
    let params = {
      type,
      detailses,
      summoney: totalCash(),
      userAccountId: account ? account.id : '',
      accountName: account ? account.chooseBankName : '',
      projectId: project ? project.id : '',
      projectName: project ? project.name : '',
      attachmentUrls
    }
    if (type < 2) {
      const dept = deptsList[selDept]
      params.deptId = dept.id
      params.deptDingId = dept.dingDeptid
      params.deptName = dept.appendParentName
    } else {
      params.deptId = deptId
      params.deptDingId = deptDingId
      params.deptName = deptName
    }
    if (query.expensesClaimNo) {
      params.resubmit = 1
    }
    if (type < 2) {
      if (restAttachments.length !== originAttachments.length) {
        params.delAttachmentIds = []
        originAttachments.forEach((v) => {
          let i = restAttachments.findIndex((r) => {
            r.id === v.id
          })
          if (i < 0) {
            params.delAttachmentIds.push(v.id)
          }
        })
      }
    } else {
      if (restAttachments.length > 0) {
        params.aliveAttachmentIds = []
        restAttachments.forEach((v) => {
          params.aliveAttachmentIds.push(v.id)
        })
      }
    }

    const action = draft
      ? 'post /expensesClaims/dingSave.json'
      : 'post /expensesClaims/dingSubmit.json'
    fetchData(action, params)
    .then((d) => {
      if (d.result === 0) {
        const pathname = draft ? '/home/draft' : '/approval/main'
        goLocation({
          pathname,
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
      tags, nextTag, type, deptName, restAttachments } = this.props
    const { options, target, openModal,
      targetName, labelId, labelName } = this.state
    return (
      <form className='wm-expense-form' onSubmit={handleSubmit}>
        { openModal &&
          <ModalSelect
            options={options}
            active={target}
            select={this.modalConfirm}
            close={this.modalClose}
            scope={targetName}
            labelId={labelId}
            labelName={labelName}
          />
        }
        <ExpenseUserInfo
          deptName={type < 2 ? deptsList && selDept > -1 &&
            deptsList[selDept].name : deptName}
          name={userName}
          departChange={this.departChange}
          type={type}
        />
        <FieldArray
          name='details'
          component={ExpenseDetails}
          tags={tags}
          nextTag={nextTag}
          costType={costType}
          changeDate={this.changeDate}
          changeCostType={this.changeCostType}
          formatCurrency={this.formatCurrency}
          details={details}
          updateTags={this.updateTags}
          updateNextTag={this.updateNextTag}
        />
        <ExpenseAccountInfo
          totalCash={totalCash()}
          projName={
            (projectsList && selProj > -1)
              ? projectsList[selProj].name
              : '请选择(必须)'
          }
          projChange={this.projChange}
          accountName={
            (accountList && selAccount > -1)
              ? accountList[selAccount].chooseBankName
              : '请选择(必须)'
          }
          accountChange={this.accountChange}
        />
        <ExpenseAttachment
          attachmentList={attachmentList}
          restAttachments={restAttachments}
          addAttachment={this.addAttachment}
          removeAttachment={this.removeAttachment}
          showImg={this.showImg}
        />
        <ExpenseApprover approvers={approvers} />
        { type && type < 2 &&
          <FormButton text='存草稿' onClick={() => this.commit(true)} /> }
        <FormButton
          text='提交'
          onClick={() => this.commit(false)}
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
    deptDingId: selector(state, 'deptDingId'),
    deptId: selector(state, 'deptId'),
    deptName: selector(state, 'deptName'),
    originAttachments: selector(state, 'originAttachments'),
    restAttachments: selector(state, 'restAttachments'),
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
