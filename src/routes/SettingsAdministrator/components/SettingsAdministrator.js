import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormButton from '@/components/FormButton'
import SearchForm from '@/components/SearchForm'
import UserList from '@/components/UserList'
import UserInfo from '@/components/UserInfo'
import Shortcut from '@/components/Shortcut'
import { fetchData, goLocation, goBack,
  checkCharacter, compareCharacter } from '@/lib/base'
import { toast, dingSetTitle, dingSetNavRight, confirm } from '@/lib/ddApi'
import { toPinyin } from '@/lib/py'
import NoData from '@/components/NoData'
import './SettingsAdministrator.scss'

class SettingsAdministrator extends Component {
  static propTypes = {
    setStep: PropTypes.func.isRequired
  }
  constructor () {
    super(...arguments)
    this.state = {
      list: [],
      admin: '',
      setAdmin: '',
      setId: '',
      isBusy: true,
      keyword: '',
      shortcut: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((v) =>
        ({ letter: v, pos: 0 })
      ),
      adminInfo: {},
      orderedList: [],
      text: ''
    }
    this.getAdminList = this::this.getAdminList
    this.handleClick = this::this.handleClick
    this.setAdmin = this::this.setAdmin
    this.gotoSettings = this::this.gotoSettings
    this.handleChange = this::this.handleChange
    this.inBusy = this::this.inBusy
    this.clearKeyword = this::this.clearKeyword
    this.orderByPY = this::this.orderByPY
    this.toPos = this::this.toPos
    this.setPos = this::this.setPos
    this.getOrderList = this::this.getOrderList
    this.filterKeyword = this::this.filterKeyword
  }
  componentDidMount () {
    dingSetTitle('设置超管')
    dingSetNavRight('')
    this.checkAuthority()
  }
  checkAuthority () {
    fetchData('get managers/authorityInfo.json')
    .then((v) => {
      if (v && v.data && v.result === 0) {
        const d = v.data
        if (d.isMain || d.isSuperMan) {
          this.getAdminList()
        } else {
          goLocation('/settings')
        }
      } else {
        toast(v.msg)
      }
    })
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
        this.getOrderList()
        this.setPos()
      } else {
        toast(v.msg)
      }
    })
  }
  handleClick (setAdmin, setId) {
    const { admin } = this.state
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
      confirm(
        `确定要将${v.nickName}设为超管吗？`,
        '', () => {
          this.setState({
            setAdmin: v.dingid,
            setId: v.id
          })
          this.handleClick(v.dingid, v.id)
        }
      )
    }
    // this.handleClick()
  }
  gotoSettings () {
    const { setStep } = this.props
    this.setState({
      text: '设置成功'
    })
    setTimeout((v) => {
      setStep('fin')
      goBack()
    }, 1500)
  }
  inBusy (isBusy = false) {
    this.setState({ isBusy })
  }
  clearKeyword () {
    this.setState({ keyword: '' })
  }
  orderByPY () {
    const { list, setAdmin } = this.state
    let orderedList = []
    let _list = [...list]
    let adminInfo

    _list.forEach((d, i) => {
      if (d.dingid === setAdmin) {
        adminInfo = d
        return
      }

      const name = d.nickName
      const tp = checkCharacter(name)
      let target = 26
      let letter = '#'
      if (tp < 3) {
        letter = (tp === 2 ? toPinyin(name) : name).charAt(0).toUpperCase()
        target = letter.charCodeAt(0) - 65

      }
      if (!orderedList[target]) {
        orderedList[target] = {
          letter,
          data: []
        }
      }
      orderedList[target].data.push(d)
    })
    orderedList = orderedList.filter((v) => v)
    orderedList.forEach((v) =>
      v.data.sort((a, b) => {
        return compareCharacter(a.nickName, b.nickName)
      })
    )
    return { adminInfo, orderedList}
  }
  getOrderList () {
    const { adminInfo, orderedList } = this.orderByPY()
    this.setState({
      adminInfo,
      orderedList
    })
  }
  toPos (pos) {
    this.listRef.scrollTop = pos
  }
  setPos () {
    let shortcut = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('').map((v) =>
      ({ letter: v, pos: 0 })
    )

    let curPos = this.adminRef ? this.adminRef.offsetHeight || 0 : 0
    let sub = this.adminRef ? this.adminRef.offsetTop || 0 : 0
    shortcut.forEach((v) => {
      if (this.posRef[v.letter]) {
        v.pos = curPos
        curPos = v.pos + this.posRef[v.letter].offsetHeight
      } else {
        v.pos = curPos
      }
    })
    this.setState({ shortcut })
  }
  filterKeyword () {
    const { keyword, orderedList } = this.state
    let r = []
    orderedList.forEach((v) => {
      v.data.forEach((v) => {
        if (v.nickName.indexOf(keyword) > -1) {
          r.push(v)
        }
      })
    })
    return [{ letter: '#', data: r }]
  }
  render () {
    const { list, setAdmin, isBusy, keyword, shortcut,
      adminInfo, orderedList, text } = this.state
    const showList = !keyword ? orderedList : this.filterKeyword(orderedList)
    this.posRef = {}
    return (
      <div className='wm-settings-administrator'>
        { isBusy && <NoData type='loading' cover /> }
        { text && <NoData className='toast' text={text} /> }
        { !isBusy && !keyword &&
          <Shortcut toTop content={shortcut} handleClick={this.toPos} />
        }
        <SearchForm
          inBusy={this.inBusy}
          submitHandler={this.handleChange}
          placeholder='搜索'
          cancelHandler={this.clearKeyword}
          hiddenButton
        />
        <div className='user-list' ref={(e) => this.listRef = e}>
          {
            (!keyword || adminInfo.nickName.indexOf(keyword) > -1) &&
              <div
                className={
                  `admin${keyword && showList[0].data.length > 0
                    ? ' bottom'
                    : ''}`
                }
                ref={(e) => this.adminRef = e}>
                {
                  adminInfo && adminInfo.nickName && !keyword &&
                    <p className='tips'>已选择的超管(只能一个)</p>
                }
                {
                  adminInfo && adminInfo.nickName &&
                    <UserInfo
                      name={adminInfo.nickName}
                      avatar={adminInfo.avatar}
                      isAdmin
                      keyword={keyword}
                    />
                }
              </div>
          }
          {
            showList.map((v) =>
              <UserList
                key={v.letter}
                title={v.letter}
                setAdmin={this.setAdmin}
                list={v.data}
                pos={(e) => this.posRef[v.letter] = e}
                showTitle={!keyword}
                keyword={keyword}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default SettingsAdministrator
