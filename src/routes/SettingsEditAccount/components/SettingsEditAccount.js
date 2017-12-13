import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import { fetchData, regAccount, goBack } from '@/lib/base'
import { toast, confirm, dingSetTitle, dingSetMenu,
  dingSetNavRight } from '@/lib/ddApi'
import NoData from '@/components/NoData'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'
import './SettingsEditAccount.scss'

class SettingsEditAccount extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    getBankBranchs: PropTypes.func,
    bankInfo: PropTypes.object,
    getBankInfo: PropTypes.func,
    clearBankInfo: PropTypes.func,
    children: PropTypes.element
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

  componentWillMount () {
    const { query, getBankInfo } = this.props
    let title = ''
    if (query.id) {
      title = '编辑银行卡号'
      getBankInfo(query.id, this.setBankInfo)
      dingSetMenu(
        [{
          id: 'delete',
          text: '删除'
        }],
        this.deleteAccount
      )
    } else {
      title = '新增银行卡号'
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
    confirm('确定要删除该银行卡吗？', '', () => {
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
      const { name, bankBranchName, defaultCard, bankName,
        oldAccount, province, city, isOther, seAccount,
        bankCode, id, accountEdited } = params
      const _account = accountEdited ? seAccount : oldAccount
      const _isDefault = defaultCard || isDefault
      const pattern = new RegExp(
        '^[a-zA-Z0-9\u4E00-\u9FA5\ \~\
        \`\!\@\#\$\%\^\&\*\(\)\-\_\+\=\
        \|\\\\[\\]\{\}\;\:\"\'\,\<\.\>\
        \/\?\u3002\uff1f\uff01\uff0c\u3001\
        \uff1b\uff1a\u201c\u201d\u2018\u2019\
        \uff08\uff09\u300a\u300b\u3008\u3009\
        \u3010\u3011\u300e\u300f\u300c\u300d\
        \ufe43\ufe44\u3014\u3015\u2026\u2014\
        \uff5e\ufe4f\uffe5]*$',
        'g'
      )
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
      } else if (!regAccount.test(_account)) {
        toast('账号不正确')
        this.setState({ isBusy: false })
        focusInput('account')
        return
      }
      if (!bankName) {
        toast('请输入银行名称')
        this.setState({ isBusy: false })
        focusInput('bankName')
        return
      }
      if (!province) {
        toast('请选择省份')
        this.setState({ isBusy: false })
        focusInput('province')
        return
      }
      if (!city) {
        toast('请选择城市')
        this.setState({ isBusy: false })
        focusInput('city')
        return
      }
      if (!bankBranchName) {
        toast('请输入开户行名称')
        this.setState({ isBusy: false })
        if (isOther) {
          focusInput('bankBranchName')
        } else {
          focusInput('isOther')
        }
        return
      } else if (!pattern.test(bankBranchName)) {
        toast('开户行名称格式不正确')
        this.setState({ isBusy: false })
        focusInput('bankBranchName')
        return
      }
      let p = {
        name,
        account: _account,
        type: 1,
        isPublic: 0,
        bankName,
        province,
        city,
        bankBranchName,
        isOther,
        isDefault: _isDefault
      }
      if (id) {
        p.id = id
      }
      if (bankCode) {
        p.bankCode = bankCode
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
    const { query, getBankBranchs, children, bankInfo } = this.props
    const { text, icon, params } = this.state
    const child = React.Children.map(
      this.props.children, child =>
        React.cloneElement(child, {
          bankParams: params,
          setParams: this.setParams
        })
    )
    return (
      <div className='wm-settings-edit-account'>
        { isDev && query.id && !query.from &&
          <DevButtons titles={['删除']} handleClick={this.deleteAccount} />
        }
        { text && (
          icon
            ? <NoData type='success' />
            : <NoData className='toast' text={text} />
        )}
        { child || <AccountEditForm
          type='account'
          targetId={+query.id}
          getBankBranchs={getBankBranchs}
          query={query}
          bankParams={params}
          setParams={this.setParams}
          editAccount={this.editAccount}
          saveAccount={this.updateAccount}
        /> }
      </div>
    )
  }
}

export default SettingsEditAccount
