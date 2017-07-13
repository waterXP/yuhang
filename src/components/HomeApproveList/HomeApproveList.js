import React,{Component} from "react"
import HomeApproveTotal from "./HomeApproveTotal.js"
import HomeApproveListCell from "./HomeApproveListCell.js"
import "./HomeApproveList.scss";
class HomeApproveList extends Component{
  constructor(){
    super()
    this.clickHandler=this.clickHandler.bind(this)
  }
  render(){
    let approve=this.props.approve
    let approveList=[]
    let sumMoney=''
    let approveListHtml=[]
    if(approve.approve){
      approveList=approve.approve.list
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
    }else{
      //没数据
    }
    return (
      <div className="wm-homeApproveList">
        <HomeApproveTotal total={sumMoney} />
        <ul>
          {approveListHtml}
        </ul>
        <div
        onClick={this.clickHandler}
        >加载更多</div>
      </div>
    )
  }
  clickHandler(){
    this.props.onClick()
  }
}


export default HomeApproveList