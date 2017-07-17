import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NoData.scss'

class NoData extends Component {
  static propTypes = {
    imgsrc: PropTypes.string,
    text: PropTypes.string
  }
  render () {
    const { text, imgsrc, icon, type, size } = this.props
    let showText = text
    let showIcon = icon
    let showImg = imgsrc
    switch (type) {
      case 'loading':
        showText = text || '数据加载中……'
        showIcon = icon || 'fa-spinner fa-pulse'
        break
      case 'nodata':
        showText = text || '没有数据'
    }
    return (
      <div className={`no-data${size ? ' ' + size : ''}`}>
        { showImg ? <img src={ showImg } /> : <i className={`fa ${showIcon ? showIcon : 'fa-smile-o'}`} /> }
        { showText && <p>{ showText }</p> }
      </div>
    )
  }
}

export default NoData
