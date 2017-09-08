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
import ExpenseCheckbox from '../ExpenseCheckbox'
import { fetchData, toast, getDate, getNumber,
  goLocation, openChosen, getChosenSource,
  uploadImage, previewImage, blurInput } from '@/lib/base'
import { saveData, setStep, getCostType,
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
    isDraft: PropTypes.any,
    position: PropTypes.number,
    parentId: PropTypes.number,
    isDelete: PropTypes.any
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
      tm: 0
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
    this.setCostType = this::this.setCostType
    this.setTM = this::this.setTM
    this.clearTM = this::this.clearTM
  }

  componentDidMount () {
    // console.log(document.querySelector('.core-layout__viewport').scrollTop)
    // document.querySelector('.core-layout__viewport').scrollTo(0, 112)
    // console.log(hashHistory)
    this.setTM()
    let { query, data, step } = this.props
    if (step === 'set cost type' && data) {
      this.initial(data)
      return
    }
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

  componentDidUpdate () {
    // console.log(this.props.position)
    if (this.state.shouldScroll) {
      // document.querySelector('.core-layout__viewport').scrollTo(0, this.props.position)
      document.querySelector('.core-layout__viewport').scrollTop = this.props.position
      this.setState({
        shouldScroll: false
      })
    }
  }

  setTM () {
    // console.log(this.state.tm)
    // const tm = setTimeout(() => window.location.reload(), 4000)
    // console.log(tm)
    let tm = 0
    const { query } = this.props
    // console.log(query)
    if (!query.reload) {
      tm = setTimeout(() => {
        hashHistory.replace({
          pathname: '/new',
          query: Object.assign({ reload: 1 }, query)
        })
        window.location.reload()
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
    // hashHistory.replace({
    //   pathname: '/new',
    //   query: {
    //     reload: 1
    //   }
    // })
    // console.log(this.state.tm)
  }
  clearTM () {
    // console.log('clear tm')
    const { tm } = this.state
    // console.log(tm)
    if (tm) {
      clearTimeout(tm)
      this.setState({ tm: 0 })
    }
  }

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
            position: 0,
            parentId: +id,
            isDelete: true
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
          this.props.change('selProj', -1)
          this.props.change('projectsList', d.projectsList || [])
        }
      })
    }
  }

  save () {
    // console.log(document.querySelector('.core-layout__viewport').scrollTop)
    const {
      userName, selAccount, selDept,
      deptsList, details, costType,
      selProj, projectsList, attachmentList,
      approvers, dispatch, tags, nextTag,
      isDraft, isDelete, parentId
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
        isDraft,
        position: document.querySelector('.core-layout__viewport').scrollTop || 0,
        isDelete,
        parentId
      })
    )
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
    const v = getNumber(newValue, 2)
    this.props.change(`${target}`, v)
    if (v !== '' && (+v < 0 || +v > 999999.99)) {
      toast('金额超出范围（0 〜 999999.99）')
    }
  }

  initial (data) {
    const { tm } = this.state
    const { query, dispatch, step, appCatch } = this.props
    if (data) {
      // after create new account
      const {
        userName, selDept, deptsList, details, selAccount,
        costType, selProj, projectsList, isDraft, parentId,
        attachmentList, approvers, tags, nextTag, position,
        isDelete } = data
      // console.log('************')
      // console.log(position)
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
              projectsList: [{ id: -1, name: '请选择' }, ...projectsList],
              attachmentList,
              originAttachments: [],
              restAttachments: [],
              approvers,
              tags,
              nextTag,
              type: 1,
              isDraft,
              position,
              parentId,
              isDelete
            })
          )
          this.setState({
            inited: true,
            shouldScroll: true
          })
          this.clearTM()
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
              selProj: -1,
              projectsList: [{ id: -1, name: '请选择' }, ...projectsList],
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
              isDelete: false
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
      query, originAttachments, restAttachments, parentId,
      isDelete } = this.props
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
    if (!draft && ~parentId) {
      params.parentId = +parentId
      if (isDelete) {
        params.delete = 1
      }
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
  setCostType (index) {
    // console.log(document.querySelector('.core-layout__viewport').scrollTop)
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

  render () {
    const { userName, totalCash, restAttachments, deptsList,
      selDept, projectsList, selProj, accountList, selAccount,
      details, attachmentList, approvers, tags, nextTag, type,
      deptName, parentId, isDelete } = this.props
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
          changeDate={this.changeDate}
          changeCostType={this.changeCostType}
          formatCurrency={this.formatCurrency}
          details={details}
          updateTags={this.updateTags}
          updateNextTag={this.updateNextTag}
          setCostType={this.setCostType}
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
        {
          parentId > -1 && <ExpenseCheckbox
            isDelete={isDelete}
          /> 
        }
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
    tags: selector(state, 'tags'),
    nextTag: selector(state, 'nextTag'),
    type: selector(state, 'type'),
    position: selector(state, 'position'),
    isDraft: selector(state, 'isDraft'), 
    parentId: selector(state, 'parentId'),
    isDelete: selector(state, 'isDelete'),
    initialValues: { details: [] }
  })
)(reduxForm({
  form: 'expenseForm'
})(ExpenseForm))
