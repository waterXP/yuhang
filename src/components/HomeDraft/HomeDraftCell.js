import React,{Component} from 'react'
import {goLocation,confirm,removeYear,getCash} from '@/lib/base'

class HomeDraftCell extends Component{
  constructor(){
    super()
    this.clickHandler=this.clickHandler.bind(this)
    this.showDetail=this.showDetail.bind(this)
  }
  render(){
    let cur=this.props.draftCell
    let type=this.props.type

    return (
      <li
      onClick={this.showDetail}
      >
        <p>{removeYear(type===2?cur.submitTime:cur.updatedAt)}</p>
        <p>{getCash(cur.sumMoney)}</p>
        <p>
        <a href="javascript:;"
        onClick={this.clickHandler}
        >删除</a></p>
      </li>
    )
  }
  clickHandler(event){
    event.stopPropagation?event.stopPropagation():event.cancelBubble=true
    let type=this.props.type
    let title='提示'
    let message='请确认是否删除此草稿'
    if(type===2){
      message='请确认是否删除此报销单'
    }
    let deleteExp=this.props.deleteExp
    let expensesClaimsId=this.props.draftCell.expensesClaimsId
    //deleteExp(expensesClaimsId)
    confirm(message,title,deleteExp.bind(this,expensesClaimsId))
  }
  showDetail(){
    let type=this.props.type
    let expensesClaimsId=this.props.draftCell.expensesClaimsId
    let url= ''
    if(type===2){
      url='/home/approveDetail/' + expensesClaimsId
    }else{
      //草稿

    }
    goLocation(url)
  }
}



export default HomeDraftCell