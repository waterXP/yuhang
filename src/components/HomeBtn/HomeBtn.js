import React, { Component } from 'react'
import { goLocation } from '@/lib/base'
import './HomeBtn.scss'
import PropTypes from 'prop-types'

class HomeBtn extends Component {
  constructor () {
    super()
    this.clickHandler = this.clickHandler.bind(this)
  }
  render () {
    let cellData = this.props.cellData
    return (
      <div className='wm-home-btn homeBtnCell' onClick={this.clickHandler}>
        {cellData.img &&
          <img
            src={cellData.img}
            className='homeCellImg'
          />
        }
        <h5>{cellData.name}</h5>
      </div>
    )
  }
  clickHandler () {
    let type = parseInt(this.props.cellData.type)
    let url = {
      pathname:'/home/home_list',
      query: {
        type: type
      }
    }
    if (type === 3) {
      url = {
        pathname:'/home/history'
      }
    }
    goLocation(url)
  }
}
HomeBtn.propTypes = {
  cellData:PropTypes.shape({
    type:PropTypes.number.isRequired
  }).isRequired
}

export default HomeBtn
