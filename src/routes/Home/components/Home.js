import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RowButtons from '@/components/RowButtons'
import ListButtons from '@/components/ListButtons'

import { dingSetTitle, dingSetNavRight, goLocation } from '@/lib/base'

import './Home.scss'
import imgDraft from '../assets/draft.png'
import imgHistory from '../assets/history.png'
import imgApproval from '../assets/approval.png'
import imgUnissued from '../assets/unissued.png'
import imgRevoked from '../assets/revoked.png'
import imgRejetced from '../assets/rejetced.png'

class Home extends Component {
  constructor () {
    super(...arguments)
    this.clickHandler = this::this.clickHandler
  }
  componentDidMount () {
    dingSetNavRight('')
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.location.pathname === '/home') {
      dingSetTitle('明快报销')
      dingSetNavRight('')
    }
    return true
  }

  clickHandler (value) {
    const type = +value
    if (type) {
      const url = {
        pathname: type === 3 ? '/home/history' : '/home/list',
        query: { type }
      }
      goLocation(url)
    }
  }

  render () {
    const { rBtns, lBtns } = this
    const children = this.props.children
    return (children
      ? <div className='wm-home'>{children}</div>
      : <div className='wm-home'>
        <RowButtons btns={rBtns} clickHandler={this.clickHandler} />
        <ListButtons btns={lBtns} clickHandler={this.clickHandler} />
      </div>
    )
  }
}

Home.prototype.rBtns = [
  {
    value: 1,
    img: imgApproval,
    text: '审批中'
  }, {
    value: 2,
    img: imgUnissued,
    text: '未发放'
  }, {
    value: 3,
    img: imgHistory,
    text: '发放历史'
  }
]
Home.prototype.lBtns = [
  {
    value: 5,
    img: imgRejetced,
    text: '已拒绝'
  }, {
    value: 4,
    img: imgRevoked,
    text: '已撤回'
  }, {
    value: 6,
    img: imgDraft,
    text: '草稿'
  }
]
Home.propTypes = {
  children: PropTypes.element
}

export default Home
