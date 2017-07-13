import React,{Component} from "react"
import Receipt from "@/components/Receipt"

class HomeApproveDetail extends Component{
  constructor(){
    super()
    this.clickHandler=this.clickHandler.bind(this)
  }
  render(){
    //console.log("homeApprove",this.props)
    let detail=this.props.detail
    //console.log('detail',detail)
    return (
      <div>
        {detail && detail.master?<Receipt data={this.props.detail} addComment={this.addComment}/>:''}
      </div>
    )
  }
  componentWillMount(){
    let expenseClaimsId=this.props.params.id
    this.props.initialApproveDetail()
    this.props.getApproveDetail(expenseClaimsId)
  }
  clickHandler(){

  }
  addComment(){}
}

export default HomeApproveDetail