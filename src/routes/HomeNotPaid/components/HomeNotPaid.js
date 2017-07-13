import React,{Component} from "react"
import HomeNotPaid from "@/components/HomeNotPaid"
class HomeNotPaidList extends Component{
  render(){
    //console.log('component',this.props)
    let notPaid=this.props.notPaid;
    return (
      <div>
        <HomeNotPaid notPaid={notPaid}/>
      </div>
    )
  }
  componentWillMount(){
    this.props.getNotPaid()
    this.props.getSumMoney()
  }
}

export default HomeNotPaidList