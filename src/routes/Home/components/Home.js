import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import HomeImage from '../assets/home2.jpg'
import './Home.scss'
import HomeBtn from "@/components/HomeBtn/HomeBtn";
import { dingSetTitle, dingSetNavRight, alert, dingSetNavLeftAndroid } from '@/lib/base'

class Home extends Component {
  render () {
    let btns = this.btns
    let btnsHtml = []
    let btnsHtmlCell=[]
    btns.map((cur,index,arr) => {
      btnsHtmlCell=[]
      cur.map((subCur,index,arr)=>{
        btnsHtmlCell.push(
          <HomeBtn key={index} cellData={subCur}/>
        )
      })
      btnsHtml.push(btnsHtmlCell)
    })
    let children =this.props.children
    if(!children){
      children = null
    }
    return( children ||
      <div className="wm-home">
        <div className="homeLine">
          {btnsHtml[0]}
        </div>
        <div className="homeLine">
          {btnsHtml[1]}
        </div>
        <div className="homeLine">
          {btnsHtml[2]}
        </div>
      </div>
    )
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.location.pathname=='/home'){
      dingSetTitle('明快报销')
      dingSetNavRight('')
    }
    this.props.initialApprove()
    return true
  }
}

Home.prototype.btns=[
  [{
    path:"/home/home_list",
    type:1,
    img:HomeImage,
    name:"审批中"
  },{
    path:"/home/home_list",
    type:2,
    img:HomeImage,
    name:"未发放"
  },{
    path:"/home/history",
    type:3,
    img:HomeImage,
    name:"发放历史"
  }],[{
    path:"/home/home_list",
    type:4,
    img:HomeImage,
    name:"已撤销"
  },{
    path:"/home/home_list",
    type:5,
    img:HomeImage,
    name:"已拒绝"
  },{
    path:"/home/home_list",
    type:6,
    img:HomeImage,
    name:"草稿"
  }]
];
Home.propTypes = {
}

export default Home
