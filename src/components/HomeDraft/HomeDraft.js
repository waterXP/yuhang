import React,{Component} from "react"
import {confirm} from '@/lib/base'
import "./HomeDraft.scss"
import HomeDraftCell from './HomeDraftCell'
import HomeRejectCell from './HomeRejectCell'

class HomeDraft extends Component{
  constructor(){
    super()
    //this.confirmNotice=this.confirmNotice.bind(this)
  }
  render(){

    let type=this.props.type
    let title=''
    let titleRight=''
    let _this=this
    if( type === 1){
      // 草稿
      title='最近保存'
    }else if( type === 2){
      // 已撤回
      title='提报日期'
    }else if( type===3 ){
      // 已拒绝
      title='日期'
      titleRight='进展'
    }
    let data=this.props.reject
    let list=[];
    let listHtml=[]
    if(data && data.data){
      list=data.data
      if(type===3){
        list.map((cur,index,arr)=>{
          listHtml.push(
            <HomeRejectCell key={index} undoCell={cur} type={type} deleteExp={_this.props.deleteExp} />
          )
        })
      }else{
        list.map((cur,index,arr)=>{
          listHtml.push(
            <HomeDraftCell key={index} draftCell={cur} type={type} deleteExp={_this.props.deleteExp} />
          )
        })
      }
    }
    let className='wm-draft'
    if(type===3){
      className+=' wm-undo'
    }
    return (
      <div className={className}>
        <header>
          <div>{title}</div>
          <div>金额</div>
          <div>{titleRight}</div>
        </header>
        <ul>
          {listHtml}
        </ul>
      </div>
    )
  }
}


export default HomeDraft




