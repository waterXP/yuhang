import React,{Component} from "react"
import HomeDraft from "@/components/HomeDraft"
class HomeDraftList extends Component{
  constructor(){
    super()
    this.deleteExp=this.deleteExp.bind(this)
  }
  render(){
    let draft=this.props.draft
    return (
      <div>
        <HomeDraft type={1} reject={draft} deleteExp={this.deleteExp}/>
      </div>
    )
  }
  componentWillMount(){
    this.props.getDraft()
    this.props.initialDraft()
  }
  deleteExp(expensesClaimsId){
    this.props.deleteExp(expensesClaimsId)
  }
}

export default HomeDraftList