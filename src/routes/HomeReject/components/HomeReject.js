import React,{Component} from "react"
import HomeDraft from "@/components/HomeDraft"

//已拒绝用的和草稿相同的列表
class HomeRejectList extends Component{
  render(){
    let reject=this.props.reject
    return (
      <div>
        <HomeDraft type={3} reject={reject}/>
      </div>
    )
  }
  componentWillMount(){
    this.props.getReject()
    this.props.initialReject()
  }
}

export default HomeRejectList