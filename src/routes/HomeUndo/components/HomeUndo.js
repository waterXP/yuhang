import React,{Component} from "react";
import HomeDraft from "@/components/HomeDraft"
class HomeUndoList extends Component{
  constructor(){
    super()
    this.deleteExp=this.deleteExp.bind(this)
  }
  render(){
    let undo=this.props.undo
    return (
      <div>
        <HomeDraft type={2} reject={undo} deleteExp={this.deleteExp} />
      </div>
    );
  }
  componentWillMount(){
    this.props.getUndo()
    this.props.initialUndo()
  }
  deleteExp(expensesClaimsId){
    this.props.deleteExp(expensesClaimsId)
  }
}

export default HomeUndoList
