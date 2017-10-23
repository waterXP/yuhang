import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewImgs.scss'
import { goLocation, confirm, toast } from '@/lib/base'

class NewImgs extends Component {
  static propTypes = {
    query: PropTypes.object,
    removeAttachment: PropTypes.func,
    restAttachments: PropTypes.array,
    attachmentList: PropTypes.array
  }

  constructor () {
    super(...arguments)

    const { query } = this.props
    const index = query.index ? +query.index : 0
    this.clickHandle = this::this.clickHandle
    this.checkParams = this::this.checkParams
    this.touchStartHandle = this::this.touchStartHandle
    this.touchEndHandle = this::this.touchEndHandle
    this.getUrls = this::this.getUrls

    this.state = {
      index: index,
      touchX: 0,
      urls: this.getUrls()
    }
  }

  componentWillMount () {
    this.checkParams()
  }

  getUrls () {
    const { restAttachments, attachmentList } = this.props
    let r = []
    restAttachments && restAttachments.forEach((v) => r.push(v.url))
    attachmentList && attachmentList.forEach((v) => r.push(v))
    return r
  }

  checkParams () {
    const { restAttachments, attachmentList } = this.props
    if (restAttachments.length === 0 && attachmentList.length === 0) {
      goLocation('/')
    }
  }

  clickHandle (i) {
    return () => {
      confirm('确定删除照片吗？', '', () => {
        const { urls, index } = this.state
        this.props.removeAttachment(i)
        toast('照片已删除。')
        if (urls.length <= 1) {
          window.history.back()
        } else {
          this.setState({
            index: index === urls.length - 1 ? 0 : index,
            urls: [
              ...urls.slice(0, index),
              ...urls.slice(index + 1)
            ]
          })
        }
      })
    }
  }

  touchStartHandle (e) {
    this.setState({
      touchX: e.targetTouches[0].clientX
    })
  }

  touchEndHandle (e) {
    const { urls = [] } = this.state
    if (urls.length > 1) {
      const { touchX } = this.state
      const sub = touchX - e.changedTouches[0].clientX
      if (urls.length > 1) {
        if (sub > 50) {
          this.setState(({ index }) => {
            if (index === urls.length - 1) {
              return { index: 0 }
            } else {
              return { index: index + 1 }
            }
          })
        } else if (sub < -50) {
          this.setState(({ index }) => {
            if (index === 0) {
              return { index: urls.length - 1 }
            } else {
              return { index: index - 1 }
            }
          })
        }
      }
    }
  }

  render () {
    const { attachmentList, restAttachments } = this.props
    const { index = 0, urls = [] } = this.state
    return <div className='wm-new-imgs'>
        <img
          src={urls[index] || 'imgs/icon_empty.png'}
          onTouchStart={this.touchStartHandle}
          onTouchEnd={this.touchEndHandle}
        />
        <button type='button' onClick={this.clickHandle(index)}>删除</button>
      </div>
  }
}

export default NewImgs
