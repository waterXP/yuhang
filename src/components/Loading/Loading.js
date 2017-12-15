import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Loading.scss'

class Loading extends Component {
  static propTypes = {
    imgsrc: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    cover: PropTypes.bool,
    className: PropTypes.string,
    noImg: PropTypes.bool
  }
  render () {
    const { text, imgsrc, icon, type, size, cover, className, noImg } = this.props
    let showText = text
    let showIcon = icon
    let showImg = imgsrc
    switch (type) {
      case 'loading':
        if (size === 'small') {
          showImg = 'imgs/loading_s.gif'
          showText = text || '加载中……'
        } else {
          showImg = 'imgs/loading.gif'
        }
        break
      case 'nodata':
        showText = text || '没有数据'
        showImg = 'imgs/icon_empty.png'
        break
      case 'upload':
        showText = text || '数据提交中……'
        showIcon = icon || 'fa-spinner fa-pulse'
        break
      case 'inDev':
        showText = text || '正在开发中……'
        showImg = 'imgs/in_dev.png'
        break
      case 'success':
        showImg = 'imgs/success.png'
    }
    return (
      <div className={
        `yh-no-data${size ? ' ' + size : ''}\
        ${cover ? ' cover' : ''}${type ? ' ' + type : ''}\
        ${className ? ' ' + className : ''}`
      }>
        <div className='box'>
          { showImg && !noImg
            ? <img src={showImg} />
            : showIcon && <i className={`fa ${showIcon}`} />
          }
          { showText && <p>{ showText }</p> }
        </div>
      </div>
    )
  }
}

export default Loading
