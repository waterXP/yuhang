import React,{Component} from 'react'
import {goLocation,removeYear,getCash} from '@/lib/base'

class HomeNotPaidCell extends Component{
  constructor(){
    super()
    this.showDetail=this.showDetail.bind(this)
  }
  render(){
    let cur=this.props.notPaid;
    let submitTime=removeYear(cur.submitTitme)
    let money=getCash(cur.sumMoney)
    return (
      <li
      onClick={this.showDetail}>
        <p>{submitTime}</p>
        <p>{money}</p>
        <p>{cur.statusName}</p>
      </li>
    )
  }
  showDetail(){
    let expensesClaimsId=this.props.notPaid.expenseClaimId
    let url= '/home/approveDetail/' + expensesClaimsId
    goLocation(url)
  }
}


export default HomeNotPaidCell