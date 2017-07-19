import React, { Component } from "react"
import { Link } from "react-router"
import { goLocation } from '@/lib/base'
import './HomeBtn.scss'

class HomeBtn extends Component{
  constructor(){
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }
  render(){
    let cellData=this.props.cellData
    return (
        <div className='wm-home-btn homeBtnCell' onClick={this.clickHandler}>
          {
            cellData.img &&
            <img
              src={cellData.img}
              className='homeCellImg'
            />
          }
          <h5>{cellData.name}</h5>
        </div>
    )
  }
  clickHandler(){
    let type = parseInt(this.props.cellData.type)
    let url={
          pathname:'/home/home_list',
          query: {
            type: type
          }
        }
      if(type===3){
        url = {
          pathname:'/home/history'
        }
      }
    goLocation(url)
  }
}

export default HomeBtn
