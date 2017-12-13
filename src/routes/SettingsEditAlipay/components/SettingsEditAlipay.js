import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import { fetchData, regPhone, regMail, goBack } from '@/lib/base'
import { toast, confirm, dingSetTitle, dingSetMenu,
  dingSetNavRight } from '@/lib/ddApi'
import NoData from '@/components/NoData'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'
import './SettingsEditAlipay.scss'

class SettingsEditAlipay extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    bankInfo: PropTypes.object,
    getBankInfo: PropTypes.func,
    clearBankInfo: PropTypes.func
  }

  constructor () {
    super(...arguments)
    this.deleteAccount = this::this.deleteAccount
    this.updateAccount = this::this.updateAccount
    this.setBankInfo = this::this.setBankInfo
    this.setParams = this::this.setParams
    this.editAccount = this::this.editAccount
    this.state = {
      isBusy: false,
      text: '',
      icon: '',
      params: {}
    }
  }

  componentDidMount () {
    const { query, getBankInfo } = this.props
    let title = ''
    if (query.id) {
      title = '编辑支付宝'
      getBankInfo(query.id, this.setBankInfo)
      dingSetMenu(
        [{
          id: 'delete',
          text: '删除'
        }],
        this.deleteAccount
      )
    } else {
      title = '新增支付宝'
      dingSetNavRight('')
    }
    dingSetTitle(title)
  }
  componentWillUnmount () {
    this.props.clearBankInfo()
  }

  editAccount () {
    const { params } = this.state
    if (!params.accountEdited) {
      this.setState({
        params: Object.assign(
          {}, params, {
            accountEdited: true,
            seAccount: ''
          }
        )
      })
    }
  }
  setBankInfo (params) {
    this.setState({
      params: { ...params }
    })
  }
  setParams (params) {
    this.setState({
      params: Object.assign({}, this.state.params, params)
    })
  }
  deleteAccount () {
    confirm('确定要删除选择的支付宝账号吗？', '', () => {
      const id = +this.props.query.id
      fetchData('get /userAccounts/deleteMyAccount.json', { id })
      .then((data) => {
        if (data.result === 0) {
          goBack()
        } else {
          toast(data.msg)
        }
      })
    })
  }
  updateAccount = (isDefault, focusInput) => {
    const { isBusy, params } = this.state
    if (!isBusy) {
      this.setState({ isBusy: true })
      let action = 'post /userAccounts/saveMyAccount.json'
      if (params.id) {
        action = 'post /userAccounts/updateMyAccount.json'
      }
      const { name, seAccount, oldAccount, id, accountEdited,
        defaultCard } = params
      const _account = accountEdited ? seAccount : oldAccount
      const _isDefault = defaultCard || isDefault
      if (!name) {
        toast('姓名不能为空')
        this.setState({ isBusy: false })
        focusInput('name')
        return
      } else if (name.length > 30) {
        toast('姓名太长')
        this.setState({ isBusy: false })
        focusInput('name')
        return
      }
      if (!_account) {
        toast('账号不能为空')
        this.setState({ isBusy: false })
        focusInput('account')
        return
      } else if (!regPhone.test(_account) && !regMail.test(_account)) {
        toast('账号不正确')
        this.setState({ isBusy: false })
        focusInput('account')
        return
      }
      let p = {
        name,
        account: _account,
        type: 2,
        isPublic: 0,
        bankName: '支付宝',
        isDefault: _isDefault
      }
      if (id) {
        p.id = id
      }
      fetchData(action, p)
      .then((data) => {
        if (data.result === 0) {
          if (isDefault && !defaultCard) {
            this.setState({
              text: '已设为默认'
            })
          } else {
            this.setState({
              text: '保存成功',
              icon: 'fa-check'
            })
          }
          setTimeout(() => {
            this.setState({
              isBusy: false,
              text: '',
              icon: ''
            })
            goBack()
          }, 1500)
        } else {
          this.setState({ isBusy: false })
          toast(data.msg)
        }
      })
    }
  }
  render () {
    const { query, bankInfo } = this.props
    const { text, icon, params } = this.state
    return (
      <div className='wm-settings-edit-alipay'>
        { isDev && query.id && !query.from &&
          <DevButtons titles={['删除']} handleClick={this.deleteAccount} />
        }
        { text && (
          icon
            ? <NoData type='success' />
            : <NoData className='taost' text={text} />
        )}
        <AccountEditForm
          type='alipay'
          targetId={+query.id}
          query={query}
          bankParams={params}
          setParams={this.setParams}
          editAccount={this.editAccount}
          saveAccount={this.updateAccount}
        />
      </div>
    )
  }
}

export default SettingsEditAlipay

