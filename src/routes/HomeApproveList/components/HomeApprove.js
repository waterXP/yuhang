import React,{Component} from "react"
import HomeApproveList from "@/components/HomeApproveList"
import {alert,dingShowPreLoad} from '@/lib/base'
import Loading from '../loading'

class HomeApprove extends Component{
  constructor(){
    super()
    this.clickHandler=this.clickHandler.bind(this)
  }
  render(){
    //console.log("homeApprove",this.props)
    let approve=this.props.approve
    console.log('appove',approve)

    return (
      <div>
        { approve.approve && approve.approve.length!=0 ?
          <HomeApproveList approve={approve} onClick={this.clickHandler} />:<Loading/>
        }
      </div>
    )
  }
  componentWillMount(){
    this.props.initialApprove()
    this.props.getApproveList()
    this.props.getSumMoney()
    //dingShowPreLoad()
  }
  clickHandler(){

    let cPage=this.props.approve.approve.cPage;
    let pageCount=this.props.approve.approve.pageCount;
    if(cPage<pageCount){
      dingShowPreLoad()
      this.props.getApproveList(cPage+1)
    }
  }
}

export default HomeApprove