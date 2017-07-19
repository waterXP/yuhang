import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HomeImage from '../assets/home2.jpg'
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
    img:HomeImage,
    name:"审批中"
  },{
    type:2,
    img:HomeImage,
    name:"未发放"
  },{
    type:3,
    img:HomeImage,
    name:"发放历史"
  }],[{
    type:4,
    img:HomeImage,
    name:"已撤销"
  },{
    type:5,
    img:HomeImage,
    name:"已拒绝"
  },{
    type:6,
    img:HomeImage,
    name:"草稿"

  }]
]
Home.propTypes = {
  children: PropTypes.element
}

export default Home
