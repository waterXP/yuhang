import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './Settings.scss'
import { history, dingSetTitle, dingSetNavRight, toast, fetchData } from '@/lib/base'

class Settings extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    children : PropTypes.element,
    step: PropTypes.string,
    setStep: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired
  }

  constructor () {
    super(...arguments)
    this.state = {
      hasAuthority: false,
      amdinIcon: ''
    }
    this.checkAuthority = this::this.checkAuthority
  }

  componentDidMount () {
    this.checkUrl()
    this.checkAuthority()
    this.props.getUserInfo()
  }
  componentDidUpdate () {
    this.checkUrl()
  }
  checkAuthority () {
    this.setState({ hasAuthority: false })
    fetchData('get managers/authorityInfo.json')
    .then((v) => {
      if (v && v.data && v.result === 0) {
        const d = v.data
        if (d.isMain || d.isSuperMan) {
          this.setState({
            hasAuthority: true,
            amdinIcon: d.superManAvatar || ''
          })
        }
      } else {
        toast(v.msg)
      }
    })
  }
  checkUrl () {
    const { step, setStep } = this.props
    if (step === 'fin') {
      // toast('设置成功', 'success')
      setStep('')
      this.checkAuthority()
      history.replace('/settings')
      dingSetTitle('我的')
      dingSetNavRight('')
    }
  }

  render () {
    const { children, userInfo } = this.props
    const { hasAuthority, amdinIcon } = this.state
    return (
      <div className='wm-settings'>
        { children ||
          <div>
            <div className='userinfo'>
              <img className='avatar' src={userInfo.avatar || 'imgs/icon_empty.png'} />
              <p className='name'>{userInfo.name}</p>
              <p className='phone'>{userInfo.mobile}</p>
            </div>
            <ul>
              <li className='a-link'>
                <Link to='/settings/accounts' activeClassName='active'>
                  <img className='icon' src='imgs/icon_rejected.png' />
                  <span className='text'>个人收款账号</span>
                  <img className='arrow' src='imgs/icon_arrow.png' />
                </Link>
              </li>
              {
                hasAuthority && <li className='a-link'>
                  <Link to='/settings/administrator' activeClassName='active'>
                    <img className='icon' src='imgs/icon_withdrawn.png' />
                    <span className='text'>超管设置</span>
                    { amdinIcon && <img className='admin-icon' src={amdinIcon} /> }
                    <img className='arrow' src='imgs/icon_arrow.png' />
                  </Link>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default Settings
