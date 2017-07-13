import React,{Component} from "react"
import {dingShowPreLoad,dingHidePreLoad} from '@/lib/base'

class Loading extends Component{
  render(){
    return (
      <div></div>
    )
  }
  componentWillMount(){
    //dingShowPreLoad()
  }
  componentWillUnmount(){
    //dingHidePreLoad()
  }
}

export default Loading
