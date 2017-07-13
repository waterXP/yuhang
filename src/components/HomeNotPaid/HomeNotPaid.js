import React,{Component} from "react"
import HomeNotPaidTotal from "../HomeApproveList/HomeApproveTotal"
import HomeNotPaidCell from './HomeNotPaidCell'
import "./HomeNotPaid.scss"

class HomeNotPaid extends Component{
  render(){
    console.log(this.props.notPaid)
    let notPaidList=[]
    let waiteTicketHtml=[]
    let waitePaidHtml=[]
    let refusePaidHtml=[]
    let sumMoneyHtml=''
    if(this.props.notPaid){
      let notPaid=this.props.notPaid.data
      let sumMoney=this.props.notPaid.sumMoney
      if(sumMoney){
        sumMoneyHtml=sumMoney
      }
      if(notPaid){
        notPaidList=notPaid.list
      }
      if(notPaidList){
        notPaidList.map((cur,index,arr)=>{
          if(cur.status===5){
            // 待票审
            waiteTicketHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          }else if(cur.status===7){
            waitePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          }else{
            refusePaidHtml.push(
              <HomeNotPaidCell notPaid={cur} key={index} />
            )
          }
        })
      }

    }// end of if

    return (
      <div className="wm-homeNotPaid">
        <HomeNotPaidTotal total={sumMoneyHtml}/>
        <ul>
          {waiteTicketHtml}
        </ul>
        <ul className='waitePaid'>
          {waitePaidHtml}
        </ul>
        <ul className='waitePaid'>
          {refusePaidHtml}
        </ul>
      </div>
    );
  }
};

export default HomeNotPaid;
