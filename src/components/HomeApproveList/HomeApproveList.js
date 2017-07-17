import React,{Component} from "react"
import HomeApproveTotal from "./HomeApproveTotal.js"
import HomeApproveListCell from "./HomeApproveListCell.js"
import {alert} from '@/lib/base'
import "./HomeApproveList.scss";
class HomeApproveList extends Component{

  render(){
    //console.log('=================',this.props)
    let approve=this.props.approve
    let approveList=[]
    let sumMoney=''
    let approveListHtml=[]
    let noMore=approve.noMore
    let showBtn=false
    if(approve.approve){
      approveList=approve.approve.list
      if(approve.approve.pageCount>1){
        showBtn=true
      }
    }
    if(approve.approveSumMoney){
      sumMoney=approve.approveSumMoney
    }
    if(approveList && approveList!==0){
      approveList.map((cur,index,arr)=>{
        approveListHtml.push(
          <HomeApproveListCell key={index} approve={cur} />
        )
      })
    }
    return (
      <div className="wm-homeApproveList" ref='approveList'>
        <HomeApproveTotal total={sumMoney} />
        <ul>
          { approveListHtml }
        </ul>
        {
          noMore?
          <div className='loadMore'>没有更多</div>:
          null
        }
      </div>
    )
  }

  componentDidMount(){
    let height=this.refs.approveList.offsetHeight
    this.props.getOffsetHeight(this.refs.approveList)
  }
  componentDidUpdate(){
    let height=this.refs.approveList.offsetHeight
    this.props.getOffsetHeight(this.refs.approveList)
  }
}


export default HomeApproveList
