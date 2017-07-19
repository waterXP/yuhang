import React,{Component} from "react"
import HomeNotPaidTotal from "../HomeApproveList/HomeApproveTotal"
import HomeNotPaidCell from './HomeNotPaidCell'
import "./HomeNotPaid.scss"

class HomeNotPaid extends Component{
  constructor(){
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }
  render(){
    let { approveSumMoney, noMore, approve } = this.props
    let notPaidList = []
    let waiteTicketHtml = []
    let waitePaidHtml = []
    let refusePaidHtml = []
    let sumMoneyHtml = ''
    let showBtn = false
    //let noMore=false
    if (approve) {
      let sumMoney = approveSumMoney
      if (sumMoney) {
        sumMoneyHtml = sumMoney
      }
      if (approve.list) {
        notPaidList = approve.list
        if (approve.pageCount > 1) {
          showBtn = true
        }
      }
      if (notPaidList) {
        notPaidList.map((cur,index,arr) => {
          if (cur.status === 5) {
            // 待票审
            waiteTicketHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          } else if (cur.status === 7) {
            waitePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          } else {
            refusePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          }
        })
      }

    }// end of if

    return (
      <div className="wm-homeNotPaid" ref='notPaidList'>
        <HomeNotPaidTotal total={sumMoneyHtml}/>
        <ul className='waitePaidFirst'>
          {waiteTicketHtml}
        </ul>
        <ul className='waitePaid'>
          {waitePaidHtml}
        </ul>
        <ul className='waitePaid'>
          {refusePaidHtml}
        </ul>
        {

          noMore?
          <div
            className='loadMore'
            >没有更多</div>:
            null
        }
      </div>
    )
  }
  clickHandler(){
    this.props.onClick()
  }
  componentDidMount(){
    let height=this.refs.notPaidList.offsetHeight
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
  componentDidUpdate(){
    let height=this.refs.notPaidList.offsetHeight
    this.props.getOffsetHeight(this.refs.notPaidList)
  }
}

export default HomeNotPaid;
