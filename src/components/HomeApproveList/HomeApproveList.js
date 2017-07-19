import React,{Component} from "react"
import HomeApproveTotal from "./HomeApproveTotal.js"
import HomeApproveListCell from "./HomeApproveListCell.js"
import {alert} from '@/lib/base'
import "./HomeApproveList.scss";
class HomeApproveList extends Component{
  render(){
    let { approve, noMore, approveSumMoney, type } = this.props
    let approveList = []
    let sumMoney = ''
    let approveListHtml = []
    let showBtn = false
    if (approve) {
      approveList=approve.list
      if (approve.pageCount>1) {
        showBtn=true
      }
    }
    if (approveSumMoney) {
      sumMoney = approveSumMoney
    }
    if (approveList && approveList !== 0) {
      if (type === 1) {
        approveList.map((cur,index,arr)=>{
          approveListHtml.push(
            <HomeApproveListCell key={index} approve={cur} />
          )
        })
      }
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
