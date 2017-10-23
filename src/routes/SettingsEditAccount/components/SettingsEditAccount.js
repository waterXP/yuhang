import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountEditForm from '@/components/AccountEditForm'
import './SettingsEditAccount.scss'
import { fetchData, goLocation, toast, confirm,
  regAccount, dingSetTitle, dingSetMenu } from '@/lib/base'
import NoData from '@/components/NoData'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'

class SettingsEditAccount extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired
  }

  constructor () {
    super(...arguments)
    this.deleteAccount = this::this.deleteAccount
    this.devClicks = this::this.devClicks
    this.state = {
      isBusy: false,
      text: '',
      icon: ''
    }
  }

  componentDidMount () {
    let title = ''
    if (this.props.query.id && !this.props.query.from) {
      title = '编辑银行卡号'
      dingSetMenu(
        [{
          id: 'delete',
          text: '删除'
        }],
        this.deleteAccount
      )
    } else {
      title = '新增银行卡号'
    }
    dingSetTitle(title)
  }

  deleteAccount () {
    confirm('确定要删除该银行卡吗？', '', () => {
      const id = +this.props.query.id
      fetchData('get /userAccounts/deleteMyAccount.json', { id })
      .then((data) => {
        if (data.result === 0) {
          window.history.back()
        } else {
          toast(data.msg)
        }
      })
    })
  }
  devClicks () {
    this.deleteAccount()
  }

  updateAccount = (val) => {
    const { isBusy } = this.state
    if (!isBusy) {
      this.setState({ isBusy: true })
      let action = 'post /userAccounts/saveMyAccount.json'
      if (val.id) {
        action = 'post /userAccounts/updateMyAccount.json'
      }
      let { name, chooseBankName, bankBranchName, defaultCard,
        bankName, oldAccount, oldChooseBankName, isDefault } = val
      if (oldChooseBankName && chooseBankName === oldChooseBankName) {
        val.account = oldAccount
      } else {
        val.account = chooseBankName
      }
      let account = val.account
      if (!name) {
        toast('姓名不能为空')
        this.setState({ isBusy: false })
        return
      } else if (name.length > 30) {
        toast('姓名太长')
        this.setState({ isBusy: false })
        return
      }
      if (!account) {
        toast('账号不能为空')
        this.setState({ isBusy: false })
        return
      } else if (regAccount.test(account)) {
      } else {
        toast('账号不正确')
        this.setState({ isBusy: false })
        return
      }
      if (!bankName) {
        toast('请输入银行名称')
        this.setState({ isBusy: false })
        return
      }
      if (!bankBranchName) {
        toast('请输入支行名称')
        this.setState({ isBusy: false })
        return
      }
      // if (!bankCode) {
      //   toast('请输入支行行号')
      //   return
      // }

      fetchData(action, {
        type: 1,
        ...val
      })
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
            // if (val.fromPage) {
            //   goLocation({
            //     pathname: val.fromPage,
            //     query: {
            //       from: '/settings/accounts'
            //     }
            //   })
            // } else {
            //   window.history.back()
            // }
            window.history.back()
          }, 1500)
        } else {
          this.setState({ isBusy: false })
          toast(data.msg)
        }
      })
    }
  }

  render () {
    const { query } = this.props
    const { text, icon } = this.state
    return (
      <div className='wm-settings-edit-account'>
        {
          isDev && query.id && !query.from &&
          <DevButtons titles={['删除']} handleClick={this.devClicks} />
        }
        {
          text &&
          (
            icon
              ? <NoData type='success' />
              : <NoData className='toast' text={text} />
          )
        }
        <AccountEditForm
          onSubmit={this.updateAccount}
          type={1}
          targetId={query.from ? 0 : query.id}
          fromPage={query.from || ''}
        />
      </div>
    )
  }
}

export default SettingsEditAccount
