import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NoData.scss'

class NoData extends Component {
  static propTypes = {
    imgsrc: PropTypes.string,
    text: PropTypes.string
  }
  render () {
    const { text, imgsrc, icon, type } = this.props
    let showText = text
    let showIcon = icon
    let showImg = imgsrc
    switch (type) {
      case 'loading':
        showText = '数据加载中……'
        showIcon = 'fa-spinner fa-pulse'
        break
      case 'nodata':
        showText='没有数据'
    }
    return (
      <div className='no-data'>
        { showImg ? <img src={ showImg } /> : <i className={`fa ${showIcon ? showIcon : 'fa-smile-o'}`} /> }
        { showText && <p>{ showText }</p> }
      </div>
    )
  }
}

export default NoData
