import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NoData.scss'

class NoData extends Component {
  static propTypes = {
    imgsrc: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    cover: PropTypes.bool
  }
  render () {
    const { text, imgsrc, icon, type, size, cover } = this.props
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
        break
      case 'upload':
        showText = text || '数据提交中……'
        showIcon = icon || 'fa-spinner fa-pulse'
    }
    return (
      <div className={`no-data${size ? ' ' + size : ''}${cover ? ' cover' : ''}`}>
        { showImg
          ? <img src={showImg} />
          : <i className={`fa ${showIcon || 'fa-smile-o'}`} />
        }
        { showText && <p>{ showText }</p> }
      </div>
    )
  }
}

export default NoData
