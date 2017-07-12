import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import './Home.scss'
import NoData from '@/components/NoData'

class Home extends Component {
  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        <NoData text='暂无内力输出报销单' imgsrc={ DuckImage } />
      </div>
    )
  }
}

export default Home
