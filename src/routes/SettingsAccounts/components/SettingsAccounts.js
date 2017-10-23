import React, { Component } from 'react'
import { goLocation, dingSetTitle, dingSetNavRight,
  toast, dingSetMenu, confirm } from '@/lib/base'
import PropTypes from 'prop-types'
import './SettingsAccounts.scss'
import AccountList from '@/components/AccountList'
import { isDev } from '@/config'
import DevButtons from '@/components/DevButtons'

class SettingsAccounts extends Component {
  static propTypes = {
    getAccounts: PropTypes.func.isRequired,
    initialAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      bankBranchName: PropTypes.string,
      bankName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isDefault: PropTypes.number.isRequired,
      account: PropTypes.string.isRequired
    }).isRequired).isRequired
  }

  constructor () {
    super(...arguments)
    this.state = {
      tooLong: false,
      inControl: false,
      delList: {}
    }
    this.controlHandler = this::this.controlHandler
    this.cancelControl = this::this.cancelControl
    this.deleteControl = this::this.deleteControl
    this.setDelList = this::this.setDelList
  }

  componentWillMount () {
    this.props.initialAccounts()
  }

  componentDidMount () {
    this.checkListHeight()
    this.props.getAccounts()
    dingSetTitle('收款账号')
    // dingSetNavRight('')
    if (this.state.inControl) {
      dingSetMenu(
        [{
          id: 'control',
          text: '操作'
        }],
        this.controlHandler
      )
    } else {
      dingSetNavRight('')
    }
  }

  componentDidUpdate (previousProps, previousState) {
    this.checkListHeight(previousState)
  }

  handleClick (path) {
    return () => {
      const counts = this.props.accounts.length
      if (counts === 20) {
        toast('账号最多只能添加20个')
      } else {
        goLocation(path)
      }
    }
  }
  controlHandler () {
    this.setState({ inControl: true, delList: {} })
  }
  setDelList (id) {
    const { inControl } = this.state
    if (inControl) {
      this.setState((prevState) => {
        let delList = Object.assign({}, prevState.delList)
        delList[id] = !prevState.delList[id]
        return { delList }
      })        
    }
  }
  cancelControl () {
    this.setState({ inControl: false })
  }
  deleteControl () {
    const { delList } = this.state
    let temp = []
    for (const i in this.state.delList) {
      if (delList[i]) {
        temp.push(i)
      }
    }
    if (temp.length > 0) {
      confirm('确定要删除选择的银行卡吗？', '', () => {
        const { delAccounts } = this.props
        delAccounts(temp)        
      })
    }
    this.setState({ inControl: false })
  }
  checkListHeight (previousState) {
    const { parent, btns } = this.refs
    const list = this.refList
    const totalHeight = parent.offsetHeight
    const contentTop = list.offsetTop
    const contentHeight = list.scrollHeight
    const btnsHeight = btns.offsetHeight
    const tooLong = totalHeight - contentTop - btnsHeight < contentHeight

    if (previousState && previousState.tooLong !== tooLong) {
      this.setState({ tooLong })
    }
  }

  render () {
    const { accounts } = this.props
    const { tooLong, inControl, delList } = this.state
    return (
      <div className='wm-settings-accounts' ref='parent'>
        { isDev && !inControl && <DevButtons titles={['操作']} handleClick={this.controlHandler} />}
        <p className={`title${tooLong ? ' fixed' : ''}`}>
          个人收款账号{accounts.length > 0 ? `（${accounts.length}）` : ''}
        </p>
        <AccountList
          isTooLong={tooLong}
          accounts={accounts}
          listRef={(e) => this.refList = e}
          inControl={inControl}
          setDelList={this.setDelList}
          delList={delList}
        />
        <div className={`btns${tooLong ? ' fixed' : ''}`} ref='btns'>
          { !inControl && <button
              className='new-card'
              onClick={this.handleClick({
                pathname: 'settings/edit/account'
              })}
            >
              新增银行卡
            </button>
          }
          {
            !inControl && <button
              className='new-card disabled'
              // onClick={this.handleClick({
              //   pathname: 'settings/edit/alipay'
              // })}
            >新增支付宝</button>
          }
          {
            inControl && <div className='row-btns'>
              <button
                className='control-btn'
                onClick={this.cancelControl}
              >
                取消
              </button>
              <button
                className='control-btn'
                onClick={this.deleteControl}
              >
                删除
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default SettingsAccounts

