import React,{Component} from "react"
import Receipt from "@/components/Receipt"
import { confirm,dingSetNavRight,dingSetTitle } from '@/lib/base'

class HomeApproveDetail extends Component{
  constructor(){
    super()
    this.clickHandler=this.clickHandler.bind(this)
    this.deleteExp=this.deleteExp.bind(this)
  }
  render(){
    //console.log("homeApprove",this.props)
    let { detail,addComment }=this.props
    if(detail && detail.master){
      let title = detail.master.userName + '的报销单'
      dingSetTitle(title)
      dingSetNavRight('')
    }
    return (
      <div>
        {detail && detail.master?
          <Receipt
            data={this.props.detail}
            addComment={ addComment }
            type={this.props.params.type}
            deleteExp={this.deleteExp}/>
          :''}
      </div>
    )
  }
  componentWillMount(){
    let { id,type }=this.props.params
    //console.log(type)
    this.props.initialApproveDetail()
    if(type==2){
      this.props.getApproveDetail(id,true)
      // true 审批通过之后的 false 审批通过之前的
    }else{
      this.props.getApproveDetail(id,false)
    }
  }
  clickHandler(){

  }
  deleteExp(expensesClaimId){
    //console.log(expensesClaimId)
    let message='请确认是否删除此报销单',
        title='提示'
      //this.props.deleteExp(expensesClaimId,this.props.params.type)
      confirm(message,title,this.props.deleteExp.bind(null,expensesClaimId,this.props.params.type))
  }
}

export default HomeApproveDetail
