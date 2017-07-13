import React,{Component} from 'react'
import {goLocation,removeYear,getCash} from '@/lib/base'

class HomeRejectCell extends Component{
  constructor(){
    super()
    this.showDetail=this.showDetail.bind(this)
  }
  render(){
    let cur=this.props.undoCell
    let type=this.props.type

    return (
      <li
      onClick={this.showDetail}
      >
        <p>{removeYear(cur.submitTime)}</p>
        <p>{getCash(cur.sumMoney)}</p>
        <p>{cur.approvalPersonName}{cur.statusName}</p>
      </li>
    )
  }
  showDetail(){
    let expensesClaimsId=this.props.undoCell.expensesClaimsId
    let url= '/home/approveDetail/' + expensesClaimsId
    goLocation(url)
  }
}



export default HomeRejectCell