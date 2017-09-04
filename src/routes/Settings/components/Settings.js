import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import './Settings.scss'
import { history, dingSetTitle, dingSetNavRight, toast, fetchData } from '@/lib/base'

class Settings extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    children : PropTypes.element,
    step: PropTypes.string,
    setStep: PropTypes.func.isRequired
  }

  constructor () {
    super(...arguments)
    this.state = {
      hasAuthority: false
    }
    this.checkAuthority = this::this.checkAuthority
  }

  componentDidMount () {
    this.checkUrl()
    this.checkAuthority()
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
            hasAuthority: true
          })
        }
      } else {
        toast(v.msg)
      }
    })
  }
  checkUrl () {
    const { step, setStep } = this.props
    // console.log(this.props.step)
    if (step === 'fin') {
      toast('设置成功', 'success')
      setStep('')
      this.checkAuthority()
      history.replace('/settings')      
    }
    dingSetTitle('我的')
    dingSetNavRight('')
  }

  render () {
    const { children } = this.props
    const { hasAuthority } = this.state
    return (
      <div className='wm-settings'>
        { children ||
          <ul>
            <li className='a-link'>
              <Link to='/settings/accounts' activeClassName='active'>
                <span className='fa fa-credit-card' />个人收款账号
              </Link>
            </li>
            {
              hasAuthority && <li className='a-link'>
                <Link to='/settings/administrator' activeClassName='active'>
                  <span className='fa fa-user' />超管设置
                </Link>
              </li>
            }
          </ul>
        }
      </div>
    )
  }
}

export default Settings
