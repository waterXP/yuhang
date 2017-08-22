import React, { Component } from 'react'
import PropTypes from 'prop-types'
import imgDraft from '../assets/draft.png'
import imgHistory from '../assets/history.png'
import imgTime from '../assets/time.png'
import imgSend from '../assets/send.png'
import imgReturn from '../assets/return.png'
import imgRefuse from '../assets/refuse.png'
import './Home.scss'
import HomeBtn from '@/components/HomeBtn/HomeBtn'
import { dingSetTitle, dingSetNavRight } from '@/lib/base'

class Home extends Component {
  render () {
    let btns = this.btns
    let btnsHtml = []
    let btnsHtmlCell = []
    btns.map((cur, index, arr) => {
      btnsHtmlCell = []
      cur.map((subCur, index, arr) => {
        btnsHtmlCell.push(
          <HomeBtn key={index} cellData={subCur} />
        )
      })
      btnsHtml.push(btnsHtmlCell)
    })
    let children = this.props.children

    return (children
      ? <div>{children}</div>
      : <div className='wm-home'>
        <div className='homeLine'>
          {btnsHtml[0]}
        </div>
        <div className='homeLine'>
          {btnsHtml[1]}
        </div>
        <div className='homeLine'>
          {btnsHtml[2]}
        </div>
      </div>
    )
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
}

Home.prototype.btns = [
  [{
    type:1,
    img:imgTime,
    name:'审批中'
  }, {
    type:2,
    img:imgSend,
    name:'未发放'
  }, {
    type:3,
    img:imgHistory,
    name:'发放历史'
  }], [{
    type:4,
    img:imgReturn,
    name:'已撤回'
  }, {
    type:5,
    img:imgRefuse,
    name:'已拒绝'
  }, {
    type:6,
    img:imgDraft,
    name:'草稿'

  }]
]
Home.propTypes = {
  children: PropTypes.element
}

export default Home
