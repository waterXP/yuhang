import React,{Component} from 'react'
import {goLocation} from '@/lib/base'
// 该页面用来首页跳转 没什么用的

class FirstIn extends Component{
  render(){
    return (
      <div></div>
    )
  }
  componentWillMount(){
    goLocation('/home')
  }
}


export default {component:FirstIn}