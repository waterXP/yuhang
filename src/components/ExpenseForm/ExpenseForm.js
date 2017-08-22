import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { FieldArray, reduxForm, initialize,
  formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from '../ExpenseUserInfo'
import ExpenseDetails from '../ExpenseDetails'
import ExpenseAccountInfo from '../ExpenseAccountInfo'
import ExpenseAttachment from '../ExpenseAttachment'
import ExpenseApprover from '../ExpenseApprover'
import BlockButtons from '../BlockButtons'
import { fetchData, toast, getDate, getNumber,
  goLocation, openChosen, getChosenSource,
  uploadImage, previewImage, blurInput } from '@/lib/base'
import { saveData } from '@/routes/New/modules/new'
import NoData from '@/components/NoData'
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
    deptDingId: PropTypes.any,
    deptId: PropTypes.number,
    deptName: PropTypes.string,
    originAttachments: PropTypes.array,
    restAttachments: PropTypes.array,
    isDraft: PropTypes.any
  }

  constructor (props) {
    super(props)
    this.state = {
      options: [],
      openModal: false,
      target: -1,
      targetName: '',
      labelId: '',
      labelName: '',
      isBusy: false,
      inited: false
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
      } else {
        this.initial()
      }
    }
  }

  getModify (id) {
    fetchData('get /expensesClaims/modify.json', { id })
    .then((d) => {
      if (!d.result) {
        this.initModify(d.data, id)
      }
    })
  }

  initModify (d, id) {
    const { userAccountId, projectId, deptId, type } = d.expensesClaims
    let params = {
      deptId: deptId,
      type: type
    }
    Promise.all([
      fetchData('get /expensesClaims/init.json', params),
      fetchData('get /userAccounts/myAccountList.json')
    ])
    .then(([d1, d2]) => {
      if (!d1.result && !d2.result) {
        const { deptsList, projectsList, usersList } = d1.data
        const accountList = d2.data

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
        if (d.detailsList.length === 0) {
          details.push({
            id: 1
          })
          tags = [1]
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
            projectsList: [{ id: -1, name: '未选择' }, ...projectsList],
            attachmentList: [],
            originAttachments: d.attachmentList,
            restAttachments: [...d.attachmentList],
            approvers: usersList || [],
            tags,
            nextTag: tags.length + 1,
            type: d.expensesClaims.type,
            deptDingId: d.dingDeptid,
            deptId: d.expensesClaims.deptId,
            deptName: d.deptName,
            isDraft: d.expensesClaims.type === 1 ? id : false
          })
        )
        this.setState({
          inited: true
        })
        this.getCostType(deptId)
        this.setState({
          inited: true
        })
      } else {
        if (d1.result) {
          toast(d1.msg)
          this.initial()
        }
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
      hashHistory.replace({
        pathname: '/new',
        query: {
          from: '/new'
        }
      })
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
    } else if (label === 'selDept') {
      this.deptChanged(id)
    }
    this.props.change(label, value)
    this.modalClose()
  }
  modalClose () {
    this.setState({
      openModal: false
    })
  }

  deptChanged (id) {
    const { deptsList, selDept, details, type } = this.props
    if (deptsList[selDept].id !== id) {
      this.getCostType(id)
      details.forEach((v) => {
        v.feeName = ''
        v.feeType = ''
      })
      fetchData('get /expensesClaims/changeDept.json', { deptId: id, cliamType: type || 1 })
      .then((d) => {
        if (!d.result) {
          this.props.change('approvers', d.usersList || [])
          this.props.change('selProj', -1)
          this.props.change('projectsList', d.projectsList || [])
        }
      })
    }
  }

  save () {
    const {
      userName, selAccount, selDept,
      deptsList, details, costType,
      selProj, projectsList, attachmentList,
      approvers, dispatch, tags, nextTag,
      isDraft
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
        nextTag,
        isDraft
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
    this.props.change(`${target}`, getNumber(newValue, 2, '', 999999.99))
  }

  initial (data) {
    const { query } = this.props
    if (data) {
      // after create new account
      const {
        userName, selDept, deptsList, details, selAccount,
        costType, selProj, projectsList, isDraft,
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
              selAccount: query.from === '/settings/accounts'
              ? accountList.length - 1
              : selAccount < accountList.length
                ? selAccount
                : -1,
              selDept,
              deptsList,
              details,
              costType,
              selProj,
              projectsList: [{ id: -1, name: '请选择' }, ...projectsList],
              attachmentList,
              originAttachments: [],
              restAttachments: [],
              approvers,
              tags,
              nextTag,
              type: 1,
              isDraft
            })
          )

          this.setState({
            inited: true
          })
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
          const accountList = d2.data || []
          let selAccount = accountList.findIndex((v) => v.isDefault)
          this.props.dispatch(
            initialize('expenseForm', {
              userName,
              accountList,
              selAccount,
              selDept: 0,
              deptsList,
              details: [{ id: 1 }],
              costType: [],
              selProj: -1,
              projectsList: [{ id: -1, name: '请选择' }, ...projectsList],
              attachmentList: [],
              originAttachments: [],
              restAttachments: [],
              approvers: usersList || [],
              tags: [1],
              nextTag: 2,
              type: 1,
              isDraft: false
            })
          )
          this.getCostType(deptsList[0].id)
          this.setState({
            inited: true
          })
        }
      })
    }
  }

  departChange () {
    blurInput()
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
        this.deptChanged(deptsList[+v.value].id)
        this.props.change('selDept', +v.value)
      })
    }
  }
  projChange () {
    blurInput()
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
    blurInput()
    const { accountList, selAccount } = this.props
    const newCard = accountList.length < 5
      ? [{
        id: -0.1,
        chooseBankName: '新增银行卡'
      }
      // , {
      //   id: -0.2,
      //   chooseBankName: '新增支付宝'
      // }
      ]
      : []
    let list = accountList ? [...accountList, ...newCard] : [...newCard]
    if (isDev) {
      this.modalOpen(list, selAccount, 'selAccount', 'id', 'chooseBankName')
    } else {
      let selectedKey = '新增银行卡'
      if (accountList && accountList > 0) {
        selectedKey = selAccount >= 0
          ? accountList[selAccount].chooseBankName
          : accountList[0].chooseBankName
      }
      let source = getChosenSource(list, 'chooseBankName')
      openChosen(source, selectedKey, (v) => {
        const id = list[+v.value].id
        if (id >= 0) {
          this.props.change('selAccount', +v.value)
        } else {
          this.save()
          hashHistory.replace({
            pathname: '/new',
            query: {
              from: '/new'
            }
          })
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
    blurInput()
    const { attachmentList, restAttachments } = this.props
    let max = 9 - attachmentList.length - restAttachments.length
    let temp = attachmentList || []
    if (isDev) {
      this.props.change('attachmentList', [...temp,
        'https://yfl2.taofairy.com/wangbacms/hqh/images/home_01.png'])
    } else {
      uploadImage(max, (v) => {
        this.props.change('attachmentList', [...temp, ...v])
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

  commitHandle (v) {
    return this.commit.bind(this, v)
  }

  commit (draft) {
    const { type, deptsList, selDept, details, totalCash,
      selAccount, accountList, projectsList, selProj,
      attachmentList, deptDingId, deptId, deptName, isDraft,
      query, originAttachments, restAttachments } = this.props
    const account = accountList[selAccount]
    const project = projectsList[selProj]
    let detailses = []
    let attachmentUrls = [...attachmentList]
    if (!draft && (type < 2 && selDept < 0 ||
      selAccount < 0 || type > 2 &&
      !deptId && !deptDingId && !deptName)) {
      let str = ''
      if (selAccount < 0) {
        str = '收款账号未选择'
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
          let i = restAttachments.findIndex((r) =>
            r.id === v.id
          )
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
    if (params.delAttachmentIds) {
      params.delAttachmentIds =
        params.delAttachmentIds.join(',')
    }
    if (params.aliveAttachmentIds) {
      params.aliveAttachmentIds =
        params.aliveAttachmentIds.join(',')
    }
    if (isDraft && !query.expensesClaimNo) {
      params.id = isDraft
    }

    this.setState({ isBusy: true })
    const action = draft
      ? 'post /expensesClaims/dingSave.json'
      : 'post /expensesClaims/dingSubmit.json'
    fetchData(action, params)
    .then((d) => {
      if (d.result === 0) {
        const pathname = draft ? '/home/home_list' : '/approval/main'
        goLocation({
          pathname,
          query: {
            active: 2,
            type: 6
          }
        })
      } else {
        toast(d.msg)
        this.setState({ isBusy: false })
      }
    })
  }
  handleSubmit (e) {
    e.preventDefault()
    return
  }

  render () {
    const { userName, totalCash, costType, restAttachments,
      deptsList, selDept, projectsList, selProj, accountList,
      selAccount, details, attachmentList, approvers,
      tags, nextTag, type, deptName } = this.props
    const { options, target, openModal, inited,
      targetName, labelId, labelName, isBusy } = this.state

    return (
      <form className='wm-expense-form' onSubmit={this.handleSubmit}>
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
        { !inited && <NoData type='loading' cover /> }
        { isBusy && <NoData type='upload' cover /> }
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
              : '请选择'
          }
          projChange={this.projChange}
          accountName={
            (accountList && selAccount > -1)
              ? accountList[selAccount].chooseBankName
              : '请选择(必填)'
          }
          accountChange={this.accountChange}
          hasProj={projectsList && projectsList.length > 0}
        />
        <ExpenseAttachment
          attachmentList={attachmentList}
          restAttachments={restAttachments}
          addAttachment={this.addAttachment}
          removeAttachment={this.removeAttachment}
          showImg={this.showImg}
        />
        <ExpenseApprover approvers={approvers} />
        <BlockButtons btns={[
          {
            text: '存草稿',
            clickHandle: this.commitHandle(true),
            hide: type && type > 1
          }, {
            text: '提交',
            clickHandle: this.commitHandle(false)
          }
        ]} />
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
    isDraft: selector(state, 'isDraft'),
    initialValues: { details: [] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
