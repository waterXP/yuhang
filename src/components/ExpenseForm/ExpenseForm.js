import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { FieldArray, reduxForm, initialize,
  formValueSelector } from 'redux-form'
import PropTypes from 'prop-types'
import ExpenseUserInfo from './ExpenseUserInfo'
import ExpenseDetails from './ExpenseDetails'
import ExpenseAccountInfo from './ExpenseAccountInfo'
import ExpenseAttachment from './ExpenseAttachment'
import ExpenseApprover from './ExpenseApprover'
import BlockButtons from '../BlockButtons'
import ExpenseCheckbox from './ExpenseCheckbox'
import { fetchData, getDate, getNumber, goLocation,
  blurInput, goBack, reload } from '@/lib/base'
import { toast, openChosen, getChosenSource,
  uploadImage, confirm } from '@/lib/ddApi'
import { saveData, cleanData, setStep, getCostType,
  setAppCatch } from '@/routes/New/modules/new'
import NoData from '@/components/NoData'
import './ExpenseForm.scss'

import { isDev } from '@/config'

import ModalSelect from '../ModalSelect'

class ExpenseForm extends Component {
  static propTypes = {
    query: PropTypes.object,
    step: PropTypes.string,
    appCatch: PropTypes.object,
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
    approvers: PropTypes.array,
    tags: PropTypes.array,
    nextTag: PropTypes.number,
    type: PropTypes.number,
    accountList: PropTypes.array,
    totalCash: PropTypes.func,
    deptDingId: PropTypes.any,
    deptId: PropTypes.number,
    deptName: PropTypes.string,
    attachmentList: PropTypes.array,
    originAttachments: PropTypes.array,
    restAttachments: PropTypes.array,
    isDraft: PropTypes.any,
    position: PropTypes.number,
    parentId: PropTypes.number,
    isDelete: PropTypes.any,
    status: PropTypes.number,
    expensesClaimId: PropTypes.number,
    setPos: PropTypes.func
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
      inited: false,
      shouldScroll: false,
      tm: 0,
      text: ''
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
    // this.removeAttachment = this.removeAttachment.bind(this)
    this.setCostType = this::this.setCostType
    this.setTM = this::this.setTM
    this.clearTM = this::this.clearTM
    this.deleteDraft = this::this.deleteDraft
    this.commitHandle = this::this.commitHandle
    this.setPos = this::this.setPos
  }

  componentDidMount () {
    this.setTM()
    let { query, data, step } = this.props
    if (data) {
      this.initial(data)
    } else {
      if (query.id) {
        this.getModify(query.id)
      } else {
        this.initial()
      }
    }
  }

  componentDidUpdate () {
    if (this.state.shouldScroll) {
      document.querySelector('.core-layout__viewport').scrollTop = this.props.position
      this.setState({
        shouldScroll: false
      })
    }
  }

  // inital page normal
  initial (data) {
    const { tm } = this.state
    const { query, dispatch, step, appCatch } = this.props
    if (data) {
      const {
        userName, selDept, deptsList, details, selAccount,
        costType, selProj, projectsList, isDraft, parentId,
        attachmentList, approvers, tags, nextTag, position,
        isDelete, status, originAttachments, restAttachments,
        expensesClaimId
      } = data
      let _details = details
      if (step === 'set cost type') {
        const { index, costTypeId, costTypeName } = appCatch
        if (index !== undefined && costTypeId &&
          costTypeName && _details[index]) {
          _details[index].feeType = costTypeId
          _details[index].feeName = costTypeName
        }
        dispatch(setStep(''))
      }
      fetchData('get /userAccounts/myAccountList.json')
      .then((d) => {
        if (d.result === 0) {
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
              details: _details,
              costType,
              selProj,
              projectsList: [...projectsList],
              attachmentList,
              originAttachments,
              restAttachments,
              approvers,
              tags,
              nextTag,
              type: 1,
              isDraft,
              position,
              parentId,
              isDelete,
              status,
              expensesClaimId
            })
          )
          this.setState({
            inited: true,
            shouldScroll: true
          })
          this.clearTM()
          dispatch(cleanData())
        } else {
          if (d.result === 1) {
            toast(d.msg)
          } else {
            if (d.ok === false) {
              toast(d.statusText)
            }
          }
          this.setState({ inited: true })
          this.clearTM()
          dispatch(cleanData())
        }
      })
    } else {
      Promise.all([
        fetchData('get /expensesClaims/init.json'),
        fetchData('get /userAccounts/myAccountList.json')
      ])
      .then(([d1, d2]) => {
        if ((d1.result === 0 || d2.result === 0) && d1.data && d2.data) {
          const { userName, deptsList,
            projectsList, usersList } = d1.data
          const accountList = d2.data || []
          let selAccount = accountList.findIndex((v) => v.isDefault)
          if (selAccount === -1 && accountList.length > 0) {
            selAccount = 0
          }
          this.props.dispatch(
            initialize('expenseForm', {
              userName,
              accountList,
              selAccount,
              selDept: 0,
              deptsList,
              details: [{ id: 1 }],
              costType: [],
              selProj: 0,
              projectsList: [{ id: -1, name: '未选择' }, ...projectsList],
              attachmentList: [],
              originAttachments: [],
              restAttachments: [],
              approvers: usersList || [],
              tags: [1],
              nextTag: 2,
              type: 1,
              isDraft: false,
              position: 0,
              parentId: -1,
              isDelete: false,
              status: 1
            })
          )
          dispatch(getCostType(deptsList[0].id))
          this.setState({
            inited: true
          })
          this.clearTM()
        } else {
          if (d1.result === 1) {
            toast(d1.msg)
          } else {
            if (d1.ok === false) {
              toast(d1.statusText)
            }
          }
          if (d2.result === 1) {
            toast(d2.msg)
          } else {
            if (d2.ok === false) {
              toast(d2.statusText)
            }
          }
          this.setState({ inited: true })
          this.clearTM()
        }
      })
    }
  }

  // inital from id which is refuse or rejext or draft 
  getModify (id) {
    fetchData('get /expensesClaims/modify.json', { id })
    .then((d) => {
      if (d.result === 0) {
        this.initModify(d.data, id)
      } else {
        if (d.result === 1) {
          toast(d.msg)
        } else {
          if (d.ok === false) {
            toast(d.statusText)
          }
        }
        this.setState({ inited: true })
        this.clearTM()
      }
    })
  }
  initModify (d, id) {
    const { userAccountId, projectId, deptId, type } = d.expensesClaims
    const { dispatch } = this.props
    let params = {
      deptId: deptId,
      type: type
    }
    Promise.all([
      fetchData('get /expensesClaims/init.json', params),
      fetchData('get /userAccounts/myAccountList.json')
    ])
    .then(([d1, d2]) => {
      if (d1.result === 0 && d2.result === 0) {
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
            isDraft: d.expensesClaims.type === 1 ? id : false,
            // isDraft: d.expensesClaims.status === 3 ? id : false,
            position: 0,
            parentId: +id,
            isDelete: true,
            status: d.expensesClaims.status,
            expensesClaimId: +id
          })
        )
        this.setState({
          inited: true
        })
        dispatch(getCostType(deptId))
        this.setState({
          inited: true
        })
        this.clearTM()
      } else {
        if (d1.result) {
          toast(d1.msg)
          this.initial()
        } else {
          if (d1.ok === false) {
            toast(d1.statusText)
          }
          if (d2.result === 1) {
            toast(d2.msg)
          } else {
            if (d2.ok === false) {
              toast(d2.statusText)
            }
          }
          this.setState({ inited: true })
          this.clearTM()
        }
      }
    })
  }

  // save params for change route
  save () {
    const {
      userName, selAccount, selDept, expensesClaimId,
      deptsList, details, costType,
      selProj, projectsList, attachmentList,
      approvers, dispatch, tags, nextTag,
      isDraft, isDelete, parentId, status,
      restAttachments, originAttachments
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
        originAttachments,
        restAttachments,
        approvers,
        tags,
        nextTag,
        isDraft,
        position: document.querySelector('.core-layout__viewport').scrollTop || 0,
        isDelete,
        parentId,
        status,
        expensesClaimId
      })
    )
  }

  // use dev env, select modal
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
        query: Object.assign(
          {...this.props.query},
          { from: '/new' }
        )
      })
      let pathname = id === -0.2
        ? '/settings/edit/alipay'
        : '/settings/edit/account'
      goLocation({
        pathname,
        query: Object.assign(
          {...this.props.query},
          { from: '/new' }
        )
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


  // when the server has no response, it's auto request
  setTM () {
    let tm = 0
    const { query } = this.props
    if (!query.reload) {
      tm = setTimeout(() => {
        hashHistory.replace({
          pathname: '/new',
          query: Object.assign({ reload: 1 }, query)
        })
        reload()
      }, 4000)
    } else {
      tm = setTimeout(() => {
        toast('服务器未响应，请过段时间再试')
        this.setState({
          inited: true
        })
      }, 4000)
    }
    this.setState({
      tm
    })
  }
  clearTM () {
    const { tm } = this.state
    if (tm) {
      clearTimeout(tm)
      this.setState({ tm: 0 })
    }
  }

  // change data
  changeDate (target, value) {
    this.props.change(target, getDate(value, 'yyyy-MM-dd'))
  }
  changeCostType (target, id, value) {
    this.props.change(`${target}.feeType`, id)
    this.props.change(`${target}.feeName`, value)
  }
  formatCurrency (target, event, newValue, previousValue) {
    event.preventDefault()
    const v = getNumber(newValue, 2)
    this.props.change(`${target}`, v)
    if (v !== '' && (+v < 0 || +v > 999999.99)) {
      toast('金额超出范围（0 〜 999999.99）')
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
  // after change department
  deptChanged (id) {
    const { deptsList, selDept, details, type, dispatch } = this.props
    if (deptsList[selDept].id !== id) {
      dispatch(getCostType(id))
      details.forEach((v) => {
        v.feeName = ''
        v.feeType = ''
      })
      fetchData('get /expensesClaims/changeDept.json', { deptId: id, cliamType: type || 1 })
      .then((d) => {
        if (!d.result) {
          this.props.change('approvers', d.usersList || [])
          this.props.change('selProj', 0)
          this.props.change('projectsList', [{ id: -1, name: '未选择' }, ...d.projectsList] || [{ id: -1, name: '未选择' }])
        }
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
    const newCard = accountList.length < 20
      ? [{
        id: -0.1,
        chooseBankName: '新增银行卡'
      }]
      // , {
      //   id: -0.2,
      //   chooseBankName: '新增支付宝'
      // }
      : []
    let list = accountList ? [...accountList, ...newCard] : [...newCard]
    if (isDev) {
      this.modalOpen(list, selAccount, 'selAccount', 'id', 'chooseBankName')
    } else {
      let selectedKey = '新增银行卡'
      if (accountList && accountList.length > 0) {
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
            query: Object.assign(
              {...this.props.query},
              { from: '/new' }
            )
          })
          let pathname = id === -0.2
            ? '/settings/edit/alipay'
            : '/settings/edit/account'
          goLocation({
            pathname,
            query: Object.assign(
              {...this.props.query},
              { from: '/new' }
            )
          })
        }
      })
    }
  }
  addAttachment () {
    blurInput()
    const { attachmentList, restAttachments } = this.props
    let max = 9 - attachmentList.length - restAttachments.length
    let temp = attachmentList || []
    if (isDev) {
      this.props.change('attachmentList', [...temp,
        'imgs/icon_empty.png'])
    } else {
      uploadImage(max, (v) => {
        this.props.change('attachmentList', [...temp, ...v])
      })
    }
  }
  showImg (index) {
    const { dispatch } = this.props
    dispatch(setStep('view imgs'))
    this.save()
    goLocation({ pathname: '/new/imgs', query: { index }})
  }

  updateNextTag (nextTag) {
    this.props.change('nextTag', nextTag)
  }
  updateTags (tags) {
    this.props.change('tags', tags)
  }

  commitHandle (v) {
    return () => {
      if (!this.state.text) {
        this.commit(v)
      }
    }
  }

  deleteDraft () {
    if (!this.state.text) {
      confirm('确定要删除草稿吗？', '', () => {
        const { expensesClaimId } = this.props
        this.setState({ isBusy: true })
        fetchData('get expensesClaims/delete.json', {
          id: expensesClaimId
        }).then((d) => {
          if (d.result === 0) {
            this.setState({
              isBusy: false,
              text: '已删除草稿'
            })
            setTimeout(
              goBack,
              1500
            )
          } else {
            toast(d.msg)
            this.setState({ isBusy: false })
          }
        })
      })
    }
  }

  commit (draft) {
    const { type, deptsList, selDept, details, totalCash,
      selAccount, accountList, projectsList, selProj,
      attachmentList, deptDingId, deptId, deptName, isDraft,
      query, originAttachments, restAttachments, parentId,
      isDelete, status, expensesClaimId } = this.props
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
    let reason = ''
    if (!draft && details.length === 0) {
      toast('请配置费用明细')
      return
    }
    details.forEach((v, i) => {
      if (valid && !draft && (!v.id || !v.cash || !v.startDate)) {
        valid = false
        reason = `费用明细${i + 1}不完整`
        if (v.cash !== undefined && v.cash !== '') {
          const temp = +getNumber(v.cash, 2)
          if (temp < 0 || temp > 999999.99) {
            reason = `费用明细${i + 1}金额超出范围（0 〜 999999.99）`
          }
        }
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
      toast(reason)
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
    if (!status) {
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
    if (!draft && ~parentId) {
      params.parentId = +parentId
      if (isDelete) {
        params.delete = 1
      }
    }
    if (!draft && expensesClaimId) {
      params.expensesClaimId = expensesClaimId
    }

    this.setState({ isBusy: true })
    const action = draft
      ? 'post /expensesClaims/dingSave.json'
      : 'post /expensesClaims/dingSubmit.json'
    fetchData(action, params)
    .then((d) => {
      if (d.result === 0) {
        this.setState({
          text: '操作成功'
        })
        setTimeout(() => {
          this.setState({
            isBusy: false,
            text: ''
          })
          const pathname = draft ? '/home/list' : '/approval/main'
          goLocation({
            pathname,
            query: {
              active: 2,
              type: 6
            }
          })
        }, 1500)
      } else {
        toast(d.msg)
        this.setState({ isBusy: false })
      }
    })
  }
  setCostType (index) {
    const { dispatch } = this.props
    if (index === undefined) {
      return
    }
    const costTypeId = this.props.details[index].feeType
    let params = { index }
    if (costTypeId) {
      params.costTypeId = costTypeId
    }
    dispatch(setStep('set cost type'))
    dispatch(setAppCatch(params))
    this.save()
    goLocation('/new/type')
  }
  handleSubmit (e) {
    e.preventDefault()
    return
  }
  setPos (v) {
    this.props.setPos(v)
  }

  render () {
    const { userName, totalCash, restAttachments, deptsList, status,
      selDept, projectsList, selProj, accountList, selAccount,
      details, attachmentList, approvers, tags, nextTag, type,
      deptName, parentId, isDelete, isDraft, expensesClaimId
    } = this.props
    const { options, target, openModal, inited,
      targetName, labelId, labelName, isBusy, text } = this.state
    const btns = status === 0
      ? [{
          text: '保存',
          clickHandle: this.commitHandle(true)
        }, {
          text: '删除',
          clickHandle: this.deleteDraft
        }, {
          text: '提交',
          clickHandle: this.commitHandle(false)          
        }]
      : [{
          text: '存草稿',
          clickHandle: this.commitHandle(true)
        }, {
          text: '提交',
          clickHandle: this.commitHandle(false)
        }]
    return (
      <form className='wm-expense-form' onSubmit={this.handleSubmit}>
        { text && <NoData className='toast' text={text} /> }
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
          changeDate={this.changeDate}
          changeCostType={this.changeCostType}
          formatCurrency={this.formatCurrency}
          details={details}
          updateTags={this.updateTags}
          updateNextTag={this.updateNextTag}
          setCostType={this.setCostType}
          setPos={this.setPos}
        />
        <ExpenseAccountInfo
          totalCash={totalCash()}
          projName={
            (projectsList && selProj > -1)
              ? projectsList[selProj].name
              : '未选择'
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
          showImg={this.showImg}
        />
        <ExpenseApprover approvers={approvers} />
        {
          parentId > -1 && expensesClaimId && status !== 0 &&
          <ExpenseCheckbox
            isDelete={isDelete}
          /> 
        }
        <BlockButtons btns={btns} />
        { !inited && <NoData type='loading' cover /> }
        { isBusy && !text && <NoData type='loading' cover /> }
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
      </form>
    )
  }
}

const selector = formValueSelector('expenseForm')

export default connect(
  state => ({
    query: state.location.query,
    step: state.new.step,
    appCatch: state.new.appCatch,
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
    status: selector(state, 'status'),
    tags: selector(state, 'tags'),
    nextTag: selector(state, 'nextTag'),
    type: selector(state, 'type'),
    position: selector(state, 'position'),
    isDraft: selector(state, 'isDraft'), 
    parentId: selector(state, 'parentId'),
    isDelete: selector(state, 'isDelete'),
    expensesClaimId: selector(state, 'expensesClaimId'),
    initialValues: { details: [] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
