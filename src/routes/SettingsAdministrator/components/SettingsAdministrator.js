import React, { Component } from 'react'
import FormButton from '@/components/FormButton'
import InputSearch from '@/components/InputSearch'
import UserList from '@/components/UserList'
import { fetchData, toast, goLocation, dingSetTitle } from '@/lib/base'
import NoData from '@/components/NoData'
import './SettingsAdministrator.scss'

class SettingsAdministrator extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      list: [],
      admin: '',
      setAdmin: '',
      setId: '',
      isBusy: true,
      keyword: ''
    }
    this.getAdminList = this::this.getAdminList
    this.handleClick = this::this.handleClick
    this.setAdmin = this::this.setAdmin
    this.gotoSettings = this::this.gotoSettings
    this.handleChange = this::this.handleChange
  }
  componentDidMount () {
    dingSetTitle('设置超管')
    this.getAdminList()
  }
  getAdminList () {
    fetchData(
      'get /users/adminList.json',
      { adminList: 'only' }
    ).then((v) => {
      if (v.result === 0) {
        this.setState({
          list: v.data,
          admin: v.superManDingId || '',
          setAdmin: v.superManDingId || '',
          isBusy: false
        })
        if (v.superManDingId) {
          dingSetTitle('变更超管')
        }
      } else {
        toast(v.msg)
      }
    })
  }
  handleClick () {
    const { admin, setAdmin, setId } = this.state
    if (admin !== setAdmin && setAdmin !== '' && setId) {
      this.setState({
        isBusy: true
      })
      fetchData(
        'post /managers/createSuperMan.json',
        { userId: setId }
      ).then((v) => {
        this.setState({ isBusy: false })
        if (v.result === 0) {
          this.gotoSettings()
        } else {
          toast(v.msg)
        }
      })
    } else {
      this.gotoSettings()
    }
  }
  handleChange (keyword) {
    this.setState({
      keyword
    })
  }
  setAdmin (v) {
    if (v) {
      this.setState({
        setAdmin: v.dingid,
        setId: v.id
      })
    }
  }
  gotoSettings () {
    goLocation({
      pathname: '/settings',
      query: { state: 'fin' }
    })
  }
  render () {
    const { list, setAdmin, isBusy, keyword } = this.state
    return (
      <div className='wm-settings-administrator'>
        { isBusy && <NoData type='loading' cover /> }
        <InputSearch handleChange={this.handleChange} />
        <UserList
          title='钉钉管理员列表'
          list={list}
          admin={setAdmin}
          setAdmin={this.setAdmin}
          keyword={keyword}
        />
        <div className='confirm-btn'>
          <FormButton
            onClick={this.handleClick}
            text='确认'
            disabled={!setAdmin}
          />
        </div>
      </div>
    )
  }
}

export default SettingsAdministrator
